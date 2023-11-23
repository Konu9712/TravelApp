const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/sechma/authSechma");
const router = express.Router();
const authenticateToken = require("../../helper/userAuthenticaion");

router.get("/test", (req, res) => {
  res.send("Hello, World! This is your Express server.");
});

router.post("/signup", async (req, res) => {
  let { email, password } = req.body;
  const avatarString = [
    "https://drive.google.com/uc?export=view&id=1da6SRinOi603YLZE3p06Ve1oRS0cBEs8",
    "https://drive.google.com/uc?export=view&id=1qxhOFwLMM6zIwaYE2iiIqqekBVJ-4dlK",
    "https://drive.google.com/uc?export=view&id=1nagt3aI-lfip_w1ywKtjDuToOSiwiUjW",
    "https://drive.google.com/uc?export=view&id=152ugpAz5NOH0LyrJ-qRa2ALbdIVoAiLr",
  ];
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    var token = jwt.sign({ foo: "bar" }, "travelapp");
    password = await bcrypt.hash(password, 10);
    // Create a new user
    const avatar = avatarString[Math.floor(Math.random() * 4)];
    const newUser = new User({
      email,
      password,
      avatar,
      token,
      name: email,
      desc: "NA",
    });

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

    const token = jwt.sign({ userId: user._id }, "travelapp");
    const avatarString = user.avatar;
    user.token = token;
    user.save();
    res.status(200).json({ message: "Login successful", token, avatarString });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login" });
  }
});

router.post("/profile", authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: `Error fetching proflie${error}` });
  }
});

router.post("/updateProfile", authenticateToken, async (req, res) => {
  try {
    const { name, email, desc } = req.body;
    let user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    if ((!name, !email, !desc)) {
      return res.status(400).json({ message: "Please enter all fields " });
    }
    user.name = name;
    user.email = email;
    user.desc = desc;
    console.log("user", user);
    return res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: `Error updating proflie${error}` });
  }
});

module.exports = router;
