const express = require("express");
const jwt = require("jsonwebtoken");
const Location = require("../../database/sechma/locationSechma");
const helper = require("../../helper/validaion");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Dashboard");
});

// Insert Location
router.post("/insert/nearyou", async (req, res) => {
  try {
    const { name, desc, lat, long, province, img, rating, review } = req.body;
    if (
      helper.isEmpty(name) ||
      helper.isEmpty(lat) ||
      helper.isEmpty(long) ||
      helper.isEmpty(province) ||
      helper.isEmpty(img) ||
      helper.isEmpty(rating) ||
      helper.isEmpty(review)
    ) {
      res.status(400).json({ message: "Please fill all the fields" });
    } else {
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
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in inserting new location" });
  }
});

// Trending location
router.post("/trending", async (req, res) => {
  try {
    const locations = await Location.find(
      {},
      { name: 1, province: 1, img: 1, rating: 1 }
    )
      .sort({ rating: -1 })
      .limit(10);

    const modifiedLocations = locations.map((location) => {
      const randomImageIndex = Math.floor(Math.random() * location.img.length);
      return {
        name: location.name,
        province: location.province,
        img: location.img[randomImageIndex],
        rating: location.rating,
      };
    });

    res.send(modifiedLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in getting trending location" });
  }
});

module.exports = router;
