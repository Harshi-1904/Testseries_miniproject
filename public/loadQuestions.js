// const mongoose = require("mongoose");
// const fs = require("fs");
// const Question = require("../questions"); // Import the Question file 

// mongoose.connect("mongodb://localhost:27017/user_auth", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error("MongoDB connection failed:", err));

// const questions = JSON.parse(fs.readFileSync("question.json", "utf-8"));

// async function insertQuestions() {
//     try {
//         await Question.insertMany(questions);
//         console.log("Questions added successfully");
//         mongoose.connection.close();
//     } catch (err) {
//         console.error("Error inserting questions:", err);
//     }
// }

// insertQuestions();
const mongoose = require("mongoose");
const fs = require("fs");
const Question = require("../questions"); // Schema
const { questions } = require("./css/os");   // Importing questions from os.js

mongoose.connect("mongodb://localhost:27017/user_auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection failed:", err));

async function insertQuestions() {
    try {
        await Question.insertMany(questions);
        console.log("Questions added successfully from os.js");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error inserting questions:", err);
    }
}

insertQuestions();
