const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../database/sechma/authSechma");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Location Screen");
});

router.post("/addtrip", async (req, res) => {
  try {
    const { token, location, startDate, endDate, foodPref } = req.body;

    // Validate required fields
    if (!location || !startDate || !endDate || !foodPref) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    // Find the user by token
    var decoded = jwt.verify(token, "travelapp");
    console.log(decoded.userId);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new trip instance
    const newTrip = {
      location,
      startDate,
      endDate,
      foodPref,
    };

    user.trips.push(newTrip);
    await user.save();

    res.status(201).json({ message: "Trip added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding trip to the user." });
  }
});

router.post("/gettrips", async (req, res) => {
  try {
    const { token } = req.body;
    // Find the user by token
    var decoded = jwt.verify(token, "travelapp");
    console.log(decoded.userId);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ trips: user.trips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting trips for the user." });
  }
});

router.post("/updatetrip", async (req, res) => {
  try {
    const { token, _id, location, startDate, endDate, foodPref } = req.body;
    // Validate required fields
    if (!location || !startDate || !endDate || !foodPref) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }
    // Find the user by token
    var decoded = jwt.verify(token, "travelapp");

    console.log(decoded);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const findTrip = user.trips.find((trip) => trip._id == _id);
    if (!findTrip) {
      return res.status(404).json({ message: "Trip not found." });
    }
    // Update the trip
    findTrip.location = location;
    findTrip.startDate = startDate;
    findTrip.endDate = endDate;
    findTrip.foodPref = foodPref;
    await user.save();
    res.status(200).json({ message: "Trip updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating trip for the user." });
  }
});

router.post("/deletetrip", async (req, res) => {
  try {
    const { token, tripId } = req.body;
    // Find the user by token
    var decoded = jwt.verify(token, "travelapp");
    console.log(decoded.userId);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const findTrip = user.trips.find((trip) => trip._id == tripId);
    if (!findTrip) {
      return res.status(404).json({ message: "Trip not found." });
    }
    // Delete the trip
    user.trips.pull(tripId);
    await user.save();
    res.status(200).json({ message: "Trip deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trip for the user." });
  }
});

module.exports = router;
