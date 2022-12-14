const express = require("express");
const quizController = require("../controllers/quizController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.route("/getAllQuizById").get(quizController.getAllQuizById);
router
  .route("/getAllQuizHistoryById")
  .get(quizController.getAllQuizHistoryById);
router
  .route("/createQuiz")
  .post(quizController.uploadQuizFile, quizController.createQuiz);

router.route("/getQuizData").post(quizController.getQuizData);
router.route("/createQuizScore").post(quizController.createQuizScore);

module.exports = router;
