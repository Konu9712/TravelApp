const express = require("express");
const jwt = require("jsonwebtoken");
const Location = require("../../database/sechma/locationSechma");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Dashboard");
});

// Insert Location
router.post("/insert/nearyou", async (req, res) => {
  try {
    const { name, desc, lat, long, province, img, rating, review } = req.body;
    const newLocation = new Location({
      name,
      desc,
      lat,
      long,
      province,
      img,
      rating,
      review,
    });
    await newLocation.save();
    res.status(201).json({ message: "Location Added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in inserting new location" });
  }
});

module.exports = router;
