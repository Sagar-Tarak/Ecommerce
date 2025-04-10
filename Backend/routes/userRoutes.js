const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

// ** User Registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user already Exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(210).json({ message: "user Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

// ** user Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    // Generate JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
