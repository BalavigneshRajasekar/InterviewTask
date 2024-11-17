const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

//Registration route

router.post("/register", async (req, res) => {
  const { userName, userEmail, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create a new user
    const bcryptPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, userEmail, password: bcryptPassword });
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//Login routes

router.post("/Login", async (req, res) => {
  const { userEmail, password } = req.body;
  try {
    const userExist = await User.findOne({ userEmail: userEmail });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Logged in successfully" });
  } catch (e) {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
