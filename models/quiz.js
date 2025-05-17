const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswerIndex: { type: Number, required: true },
    correctAnswer: { type: String, required: true } // ✅ Store the actual correct answer
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;

