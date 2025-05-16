const mongoose = require("mongoose");

const UserAnswerSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // If using ObjectId, change to: mongoose.Schema.Types.ObjectId
    Category:{type:String, required:true},
    marks:{type:String,required:true}, // Track when answers were stored
  
});

module.exports = mongoose.model("UserAnswer", UserAnswerSchema);
