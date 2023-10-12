const express = require("express");
const app = express();
const port = 3000; // You can use any available port you prefer

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World! This is your Express server.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
