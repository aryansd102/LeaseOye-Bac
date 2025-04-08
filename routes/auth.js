const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserDetails = require("../models/UserDetails");

const router = express.Router();

//Login Route 
router.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: "Invalid email or password" });
      }
      const userId = user.userId;
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
      });

      res.json({ message: "Login successful", token: token, userId: userId});

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
});


// User Signup
router.post("/signup", async (req, res) => {
  try {
    let { name, email, userId, password } = req.body;
    if (!req.body) {
        return res.status(400).json({message: "Missing data"});
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingUserDetails = await UserDetails.findOne({email});
    if (existingUserDetails) {
      userId = existingUserDetails.userId;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, userId, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// fetch user
router.post("/user", async (req, res) => {
  try {
      if (!req.body || !req.body.userId) {
          return res.status(400).json({ message: "Missing user ID" });
      }
      const userIdData = req.body.userId;
      const userDetails = await User.findOne({ userId: userIdData });
      if (!userDetails) {
          return res.status(404).json({ message: "User not found" });
      }
      const sanitizedUser = { ...userDetails._doc, _id: userDetails._id.toString() };
      res.status(200).json({ message: "Fetched User details", userDetails: sanitizedUser });
  } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;