const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const quizRouter = require("./routes/quizRoutes");
const globalErrorHandler = require("./controllers/errorController");

// Start express app
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001", // reflect request origin
    credentials: true,
  })
);
app.options("*", cors()); // enable pre-flight?

app.use(express.json());
app.use(cookieParser());

//MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/quiz", userRouter);
app.use("/quiz", quizRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
