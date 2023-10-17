const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"]
  },
  role: {
    type: String,
    enum: ["user", "admin", "administrator"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    validate: [validator.isStrongPassword, "Please provide a strong password"]
  },
  image: {
    type: String,
    default: "default.png"
  }
});

module.exports = mongoose.model("User", userSchema, "users");