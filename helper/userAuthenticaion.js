const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../database/sechma/authSechma");
const app = express();

const authenticateToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }
  var decoded = jwt.verify(token, "travelapp");
  const user = await User.findById(decoded.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  if (!user) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
  req.user = user;
  next();
};

module.exports = authenticateToken;
