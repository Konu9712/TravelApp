const express = require("express");
const app = express();
const db = require("./database/conn");
const routes = require("./routes");
const port = process.env.PORT || 3000;

//MiddelWare
app.use(express.json());
routes(app);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World! This is your Express server.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
