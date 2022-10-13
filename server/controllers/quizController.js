const multer = require("multer");
const Excel = require("exceljs");
const path = require("path");
const Quiz = require("../models/quizModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/quiz/files");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".")[1];
    cb(null, `quiz-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.originalname.split(".")[1].startsWith("xlsx") ||
    file.originalname.split(".")[1].startsWith("xls")
  ) {
    cb(null, true);
  } else {
    cb(new AppError("Support only .xlsx and .xls file", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadQuizFile = upload.single("quizFile");

exports.createQuiz = catchAsync(async (req, res, next) => {
  const { quizName, numberOfQuestion } = req.body;

  const newQuiz = await Quiz.create({
    quizName,
    numberOfQuestion,
    uploadQuiz: req.file.filename,
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    data: {
      newQuiz,
    },
  });
});

exports.getAllQuizById = catchAsync(async (req, res, next) => {
  const AllQuizByUser = await Quiz.find({ user: req.user._id });

  // if (!user) {
  //   return next(new AppError("Email is invalid or already taken", 401));
  // }

  res.status(200).json({
    status: "success",
    data: AllQuizByUser,
  });
});

exports.getQuizData = catchAsync(async (req, res, next) => {
  const { excelName } = req.body;

  const workbook = new Excel.Workbook();

  try {
    const file = await workbook.xlsx.readFile(
      path.join(__dirname, `../public/quiz/files/${excelName}`)
    );

    let theData = [];
    workbook.eachSheet((ws, sheetId) => {
      let headers = {};

      for (let i = 1; i <= ws.actualColumnCount; i++) {
        headers[i] = ws.getRow(1).getCell(i).value;
      }

      for (let x = 2; x <= ws.actualRowCount; x++) {
        let theRow = {};
        for (let y = 1; y <= ws.actualColumnCount; y++) {
          theRow[headers[y]] = ws.getRow(x).getCell(y).value;
        }
        theData.push(theRow);
      }
      return theData;
    });

    console.log(theData);

    res.status(200).json({
      status: "success",
      data: theData,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error read file", 404));
  }
});