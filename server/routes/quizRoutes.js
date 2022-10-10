const express = require("express");
const quizController = require("../controllers/quizController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/createQuiz")
  .post(quizController.uploadQuizFile, quizController.createQuiz);

module.exports = router;
