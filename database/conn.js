// db.js

const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://travelapp:travelapp@cluster0.jbyelju.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
