const catchAsync = require("../utils/catchAsync");

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log("accepted");
  console.log(req.body);
  // const newUser = await User.create({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password,
  //   confirmPassword: req.body.confirmPassword,
  // });

  // createSendToken(newUser, 201, res);
});
