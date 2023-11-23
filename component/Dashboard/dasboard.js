const express = require("express");
const jwt = require("jsonwebtoken");
const Location = require("../../database/sechma/locationSechma");
const helper = require("../../helper/validaion");
const activitySechma = require("../../database/sechma/activitySechma");
const locationSechma = require("../../database/sechma/locationSechma");
const resturantSechma = require("../../database/sechma/resturanSechma");

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
      { _id: 1, name: 1, province: 1, img: 1, rating: 1 }
    )
      .sort({ rating: -1 })
      .limit(10);

    const modifiedLocations = locations.map((location) => {
      const randomImageIndex = Math.floor(Math.random() * location.img.length);
      return {
        _id: location._id,
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

//Insert Activites
router.post("/insert/activities", async (req, res) => {
  try {
    const { name, desc, lat, long, province, img, rating, review } = req.body;
    if (
      helper.isEmpty(name) ||
      helper.isEmpty(lat) ||
      helper.isEmpty(long) ||
      helper.isEmpty(province) ||
      helper.isEmpty(img) ||
      helper.isEmpty(rating)
    ) {
      res.status(400).json({ message: "Please fill all the fields" });
    } else {
      const newActivity = new activitySechma({
        name,
        desc,
        lat,
        long,
        province,
        img,
        rating,
      });
      await newActivity.save();
      res.status(201).json({ message: "Activiy Added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in inserting new location" });
  }
});

// Trending location
router.post("/activities", async (req, res) => {
  try {
    const locations = await activitySechma.aggregate([
      { $project: { name: 1, province: 1, img: 1, rating: 1 } },
      { $sample: { size: 10 } },
    ]);

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
    res.status(500).json({ message: "Error in getting activities" });
  }
});

//Insert Resturants
router.post("/insert/resturant", async (req, res) => {
  try {
    console.log(req.body);
    const { name, desc, city, lat, long, province, img, rating, review } =
      req.body;
    if (
      helper.isEmpty(name) ||
      helper.isEmpty(lat) ||
      helper.isEmpty(long) ||
      helper.isEmpty(city) ||
      helper.isEmpty(province) ||
      helper.isEmpty(img) ||
      helper.isEmpty(rating) ||
      helper.isEmpty(review)
    ) {
      res.status(400).json({ message: "Please fill all the fields" });
    } else {
      const newResturant = new resturantSechma({
        name,
        desc,
        city,
        lat,
        long,
        province,
        img,
        rating,
        review,
      });
      await newResturant.save();
      res.status(201).json({ message: "Resturant Added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in inserting new resturant" });
  }
});

// Fetch all resturants
router.post("/restaurants", async (req, res) => {
  try {
    const restaurants = await resturantSechma.aggregate([
      { $project: { name: 1, city: 1, img: 1, rating: 1 } },
      { $sample: { size: 10 } },
    ]);

    const modifiedRestaurants = restaurants.map((restaurant) => {
      const randomImageIndex = Math.floor(
        Math.random() * restaurant.img.length
      );
      return {
        name: restaurant.name,
        city: restaurant.city,
        img: restaurant.img[randomImageIndex],
        rating: restaurant.rating,
      };
    });

    res.send(modifiedRestaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in getting restaurants" });
  }
});

//Fetch Detail fo activity and resturant
router.post("/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const activity = await activitySechma.findOne(
      { name },
      { name: 1, img: 1, lat: 1, long: 1, desc: 1, reviews: 1 }
    );
    const restaurant = await resturantSechma.findOne(
      { name },
      { name: 1, img: 1, lat: 1, long: 1, desc: 1, reviews: 1 }
    );

    if (activity || restaurant) {
      const result = {
        ...(activity && {
          name: activity.name,
          img: activity.img,
          lat: activity.lat,
          long: activity.long,
          desc: activity.desc,
          reviews: activity.reviews,
        }),
        ...(restaurant && {
          name: restaurant.name,
          img: restaurant.img,
          lat: restaurant.lat,
          long: restaurant.long,
          desc: restaurant.desc,
          reviews: restaurant.reviews,
        }),
      };

      res.status(200).json(result);
    } else {
      res
        .status(404)
        .json({ message: "No matching activity or restaurant found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error in fetching activity or restaurant" });
  }
});

module.exports = router;
