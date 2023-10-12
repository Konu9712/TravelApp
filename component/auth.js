const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../database/sechma/authSechma");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Hello, World! This is your Express server.");
});

router.get("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    var token = jwt.sign({ foo: "bar" }, "travelapp", { expiresIn: "1h" });

    // Create a new user
    const newUser = new User({ email, password, token });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while signing up" });
  }
});

module.exports = router;
