const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    const existedUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existedUser) {
      return res.status(409).json({
        message: "User with email or username already exists",
      });
    }

    const newUser = new User({
      email,
      username,
      password,
      confirmPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        createdAt: savedUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "Login successful",
      data: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      message: "Failed to login",
      error: error.message,
    });
  }
});

module.exports = router;
