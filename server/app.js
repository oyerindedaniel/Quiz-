const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Start express app
const app = express();

//MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: "10kb" }));

module.exports = app;
