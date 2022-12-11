const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "username", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      data: updatedUser,
    },
  });
});

exports.setTimeDuration = catchAsync(async (req, res, next) => {
  const { hours, minutes, seconds } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $set: {
        timeDuration: {
          hours,
          minutes,
          seconds,
        },
      },
    },
    {
      new: true,
    }
  );

  user.setTimeDurationBool();

  if (!user) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});
