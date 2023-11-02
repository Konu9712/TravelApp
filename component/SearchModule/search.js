const express = require("express");
const jwt = require("jsonwebtoken");
const helper = require("../../helper/validaion");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Search Screen");
});

// Search Location

module.exports = router;
