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
  console.log(req.user.id);
  console.log("s");
  const user = await User.findOneAndUpdateOne(
    { _id: req.user.id },
    {
      $set: {
        timeDuration: {
          hours: req.body.hours,
          minutes: req.body.minutes,
          seconds: req.body.seconds,
        },
      },
    },
    {
      new: true,
    }
  );

  console.log(user);

  return "a";
});
