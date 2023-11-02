const mongoose = require("mongoose");

const resturantSechma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  img: {
    type: Array,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("Resturant", resturantSechma);
