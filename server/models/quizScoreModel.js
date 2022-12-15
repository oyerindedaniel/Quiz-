const mongoose = require("mongoose");
const User = require("../models/userModel");
const Quiz = require("../models/quizModel");

const quizScoreSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: [true, "Please tell us the Quiz Name!"],
  },
  hasTaken: {
    type: Boolean,
    default: false,
  },
  quizScore: {
    type: Number,
    required: [true, "Please tell us the Quiz Score!"],
  },
  createdAt: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Quiz must belong to a User."],
  },
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: "Quiz",
    required: [true, "QuizScore must belong to a Quiz."],
  },
});

const QuizScore = mongoose.model("QuizScore", quizScoreSchema);

module.exports = QuizScore;
