const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");

// Start express app
const app = express();

// app.use(cors());

app.use(
  cors({
    origin: true, // reflect request origin
    credentials: true,
  })
);
app.options("*", cors()); // enable pre-flight?

//MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/quiz", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
