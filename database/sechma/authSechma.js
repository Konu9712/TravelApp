const mongoose = require("mongoose");

const tripSechma = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: false,
  },
  foodPref: {
    type: String,
    required: false,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  trips: [tripSechma],
});

module.exports = mongoose.model("User", userSchema);
