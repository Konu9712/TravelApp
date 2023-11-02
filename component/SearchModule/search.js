const express = require("express");
const jwt = require("jsonwebtoken");
const helper = require("../../helper/validaion");
const locationSechma = require("../../database/sechma/locationSechma");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Search Screen");
});

// Search Location
router.post("/allImagesShuffled", async (req, res) => {
  try {
    const locations = await locationSechma.find({}, { name: 1, img: 1 });
    const allImages = [];
    locations.forEach((location) => {
      location.img.forEach((image) => {
        allImages.push({ name: location.name, img: image });
      });
    });
    const shuffledImages = shuffleArray(allImages);
    res.json(shuffledImages);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching and shuffling all images" });
  }
});
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

module.exports = router;
