const express = require("express");
const jwt = require("jsonwebtoken");
const locationSechma = require("../../database/sechma/locationSechma");
const resturanSechma = require("../../database/sechma/resturanSechma");
const activitySechma = require("../../database/sechma/activitySechma");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Location Screen");
});

router.post("/:id", async (req, res) => {
  try {
    const location = await locationSechma.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    const restaurants = await resturanSechma.find({ city: location.name });
    const activities = await activitySechma.find({
      province: location.province,
    });

    const modifiedLocation = {
      name: location.name,
      img: location.img,
      restaurants: restaurants.map((restaurant) => ({
        name: restaurant.name,
        img: restaurant.img,
      })),
      activities: activities.map((activity) => ({
        name: activity.name,
        img: activity.img,
      })),
    };

    res.json(modifiedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching location" });
  }
});

module.exports = router;

module.exports = router;
