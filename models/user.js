const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Full Name is required"], 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"] 
    },
    password: { 
        type: String, 
        required: [true, "Password is required"], 
        minlength: [6, "Password must be at least 6 characters long"] 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Export the User Model
module.exports = mongoose.model("User", userSchema);