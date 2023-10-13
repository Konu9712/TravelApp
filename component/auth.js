const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../database/sechma/authSechma");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Hello, World! This is your Express server.");
});

router.post("/signup", async (req, res) => {
  let { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    var token = jwt.sign({ foo: "bar" }, "travelapp", { expiresIn: "1h" });
    password = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ email, password, token });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while signing up" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "travelapp", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login" });
  }
});

module.exports = router;
