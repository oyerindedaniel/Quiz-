const multer = require("multer");
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
