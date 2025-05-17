const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: String,
    options: [String],  // Array of options
    correctAnswer: String, // Correct answer
    category: String // For filtering by topic (e.g., OS, Networking)
});

module.exports = mongoose.model("Question", QuestionSchema);
