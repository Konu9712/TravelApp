const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
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
  review: [reviewSchema],
});

module.exports = mongoose.model("Location", locationSchema);
