const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./config"); // Ensure this is the correct model import
const  USer= require('./models/user.js');
const app = express();
const userAnswer=require("./userAnswer.js");
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/user_auth")
  .then(() => console.log("Database connected successfully"))
  .catch(() => console.log("Database connection failed"));

  

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("mini_project.ejs");
});



app.get("/all/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      res.render("mini_project1.ejs", { user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});



// os
app.get("/os/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      res.render("os.ejs", { user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});

// cd 
app.get("/cd/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      res.render("cd.ejs", { user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});

// coa
app.get("/coa/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      res.render("coa.ejs", { user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});

// cn
app.get("/cn/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      res.render("cn.ejs", { user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});

// ds
app.get("/ds/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      res.render("ds.ejs", { user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});

// c
app.get("/c/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      res.render("c.ejs", { user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});

// daa
app.get("/daa/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      res.render("daa.ejs", { user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});

// app
app.get("/app/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      res.render("app.ejs", { user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

// Dynamic User Page
app.get("/project/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("project", { user }); // Make sure project.ejs exists in views folder
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading project page");
  }
});

// Signup Page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Handle Signup
app.post("/signup", async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already in use");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name: full_name,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    await newUser.save();

    console.log("User registered:", newUser);

    // Redirect to login after successful signup
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up");
  }
});


const session = require("express-session");
// Enable session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure: true if using HTTPS
  })
);

// Modify Login Route to Store User Data in Session
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    // Store user in session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // Redirect to Project Page instead of Profile
    return res.redirect(`/project/${user.name}`);

  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});


// Redirect "/profile" to "/profile/:name" Automatically
app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not authenticated
  }
  return res.redirect(`/profile/${req.session.user.name}`);
});

// Profile Page Route with User Data
app.get("/profile/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("profile", { user }); // Ensure user object is sent to EJS
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading profile page");
  }
});

// Profile Update POST Route
app.post("/profile/:name/update", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password only if user enters a new one
    const updatedData = { name, email };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    // Find user by their current name and update
    const user = await User.findOneAndUpdate(
      { name: req.params.name },
      updatedData,
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update session with new user info
    req.session.user.name = user.name;
    req.session.user.email = user.email;

    res.redirect(`/profile/${user.name}`); // Redirect to updated profile
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Internal Server Error");
  }
});




// Logout Route
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});


// Score Schema (Newly Added)
const ScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: Number,
  answers: [{
      question: String,
      selectedAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean
  }],
  date: { type: Date, default: Date.now }
});
const Score = mongoose.model("Score", ScoreSchema);

// ✅ GET Score Page
app.get("/score/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      // Get the latest score from MongoDB
      let {name}=req.params;
      userAnswer.find({userId:name}).then((data)=>{
        console.log(data);
        res.render("score",{data});
      })
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});

// ✅ POST Score Route
app.post("/score/:name", async (req, res) => {
  try {
      const { name } = req.params;
      // Find user
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.redirect("/login");
      }
      let record=new UserAnswer({
        userId: name ,
        Category:req.body.category,
        marks:req.body.marks
      });
      await record.save().then((res)=>{
        console.log(res);
      });
      res.redirect(`/score/${user.name}`);
  } catch (error) {
      console.error("Error processing score:", error);
      res.status(500).send("Internal Server Error");
  }
});

// os questions
const Question = require("./questions");
app.get("/questions", async (req, res) => {
  try {
      const dbQuestions = await Question.find({ category: "OS" }); // Fetch OS questions from MongoDB

      // Convert to frontend format
      const formattedQuestions = dbQuestions.map(q => ({
          question: q.question,
          options: q.options,
          correct: q.options.indexOf(q.correct) // Convert correct answer string to index
      }));

      res.json(formattedQuestions); // Send corrected format to frontend
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
  }
});


// cd questions
app.get("/questions", async (req, res) => {
  try {
      const dbQuestions = await Question.find({ category: "CD" }); // Fetch OS questions from MongoDB

      // Convert to frontend format
      const formattedQuestions = dbQuestions.map(q => ({
          question: q.question,
          options: q.options,
          correct: q.options.indexOf(q.correct) // Convert correct answer string to index
      }));

      res.json(formattedQuestions); // Send corrected format to frontend
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
  }
});


// cn questions
app.get("/questions", async (req, res) => {
  try {
      const dbQuestions = await Question.find({ category: "CN" }); // Fetch OS questions from MongoDB

      // Convert to frontend format
      const formattedQuestions = dbQuestions.map(q => ({
          question: q.question,
          options: q.options,
          correct: q.options.indexOf(q.correct) // Convert correct answer string to index
      }));

      res.json(formattedQuestions); // Send corrected format to frontend
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// c questions
app.get("/questions", async (req, res) => {
  try {
      const dbQuestions = await Question.find({ category: "C" }); // Fetch OS questions from MongoDB

      // Convert to frontend format
      const formattedQuestions = dbQuestions.map(q => ({
          question: q.question,
          options: q.options,
          correct: q.options.indexOf(q.correct) // Convert correct answer string to index
      }));

      res.json(formattedQuestions); // Send corrected format to frontend
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// daa questions
app.get("/questions", async (req, res) => {
  try {
      const dbQuestions = await Question.find({ category: "DAA" }); // Fetch OS questions from MongoDB

      // Convert to frontend format
      const formattedQuestions = dbQuestions.map(q => ({
          question: q.question,
          options: q.options,
          correct: q.options.indexOf(q.correct) // Convert correct answer string to index
      }));

      res.json(formattedQuestions); // Send corrected format to frontend
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
  }
});
    
//app questions
app.get("/questions", async (req, res) => {
  try {
      const dbQuestions = await Question.find({ category: "APP" }); // Fetch OS questions from MongoDB

      // Convert to frontend format
      const formattedQuestions = dbQuestions.map(q => ({
          question: q.question,
          options: q.options,
          correct: q.options.indexOf(q.correct) // Convert correct answer string to index
      }));

      res.json(formattedQuestions); // Send corrected format to frontend
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// coa questions
app.get("/questions", async (req, res) => {
  try {
      const dbQuestions = await Question.find({ category: "COA" }); // Fetch OS questions from MongoDB

      // Convert to frontend format
      const formattedQuestions = dbQuestions.map(q => ({
          question: q.question,
          options: q.options,
          correct: q.options.indexOf(q.correct) // Convert correct answer string to index
      }));

      res.json(formattedQuestions); // Send corrected format to frontend
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
  }
});

app.use(express.json()); // Middleware to parse JSON
const UserAnswer = require("./userAnswer");
app.post("/submit-answers", async (req, res) => {
  try {
      const { userId, answers } = req.body; // Answers = [{ questionId, selectedAnswer }]

      let correctCount = 0;
      let totalQuestions = answers.length;

      for (const ans of answers) {
          // Fetch the question using questionId
          const question = await Question.findById(ans.questionId);

          if (question) {
              const isCorrect = question.correctAnswer === ans.selectedAnswer;

              // Store user answer in the database
              await UserAnswer.create({
                  userId: userId,
                  questionId: question._id,
                  selectedAnswer: ans.selectedAnswer,
                  isCorrect: isCorrect
              });

              if (isCorrect) correctCount++;
          } else {
              console.warn("Question not found for ID:", ans.questionId);
          }
      }

      // Calculate the score percentage
      const score = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

      res.json({ message: "Answers submitted successfully!", score });
  } catch (error) {
      console.error("Error submitting answers:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// history
app.get("/history/:name", async (req, res) => {
  try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.status(404).send("User not found");
      }

      // Get the latest score from MongoDB
      let {name}=req.params;
      userAnswer.find({userId:name}).then((data)=>{
        console.log(data);
        res.render("history",{data});
      })
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
  }
});

// ✅ POST Score Route
app.post("/history/:name", async (req, res) => {
  try {
      const { name } = req.params;
      // Find user
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
          return res.redirect("/login");
      }
      let record=new UserAnswer({
        userId: name ,
        Category:req.body.category,
        marks:req.body.marks
      });
      await record.save().then((res)=>{
        console.log(res);
      });
      res.redirect(`/history/${user.name}`);
  } catch (error) {
      console.error("Error processing score:", error);
      res.status(500).send("Internal Server Error");
  }
});


app.get("/check/:username/:category", async (req, res) => {
  try {
      const { username, category } = req.params;
      console.log(username);
      console.log(category);
      const user = await USer.findOne({ name: username });
      if (!user) return res.status(404).json({ exists: false });
// const existing =  await UserAnswer.find({
//           userId: user._id.toString(),
//           Category: category
//       });
UserAnswer.findOne({userId:username,Category:category}).then(res=>console.log(res));
UserAnswer.find({
  userId: username,
  Category: category
}) 
.then((existing) => {
  console.log(existing);
  if (existing.length > 0) {
    // console.log("Quiz already attempted.");
    // Do something if exists
    res.json({ exists: true });

  } else {
    // console.log("Quiz not attempted yet.");
    // Do something else
    res.json({ exists: false });
  }
})
.catch(err => {
  console.error("Error checking UserAnswer:", err);
});

    //  console.log(existing.userId);
    //   if (existing) {
    //       res.json({ exists: true });
    //   } else {
    //       res.json({ exists: false });
    //   }
    //   console.log({ exists: existing ? true : false });

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
  }
});


// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
