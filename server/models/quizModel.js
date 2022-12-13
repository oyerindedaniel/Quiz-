const mongoose = require("mongoose");
const User = require("../models/userModel");

const quizSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: [true, "Please tell us the Quiz Name!"],
  },
  numberOfQuestion: {
    type: Number,
    required: [true, "Please tell us the Number of Question!"],
  },
  uploadQuiz: {
    type: String,
    required: [true, "Please upload the Quiz File"],
  },
  hasTaken: {
    type: Boolean,
    default: false,
  },
  quizScore: {},
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Quiz must belong to a User."],
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
