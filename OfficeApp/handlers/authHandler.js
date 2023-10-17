const User = require("../pkg/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const { sendWelcomeEmail, sendPasswordResetEmail } = require("../pkg/mailer");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: req.file ? req.file.filename : 'default.png'
    });
    await sendWelcomeEmail(email);
    return res.status(201).send(newUser);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("This user with this email doesn't exist in the database");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password or email");
    }
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      secure: false,
      httpOnly: true
    });
    return res.status(200).send(token);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const resetLink = `${process.env.RESET_PASSWORD_LINK}?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetLink);
    return res.status(200).send("Password reset link has been sent to your email");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    if (!bcrypt.compareSync(oldPassword, user.password)) {
      return res.status(400).send("Incorrect password");
    }
    if (oldPassword === newPassword) {
      return res.status(400).send("New password cannot be the same as the old password");
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).send("Password reset successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(500).send("You are not logged in! Please log in");
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send("User doesn't exist anymore");
    }
    req.auth = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  protect
};