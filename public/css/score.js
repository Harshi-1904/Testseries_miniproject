const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    score: Number,
    category: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Score", ScoreSchema);
