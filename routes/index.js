const authRoutes = require("../component/Auth/auth");
const dashboardRoutes = require("../component/Dashboard/dasboard");
const searchRoutes = require("../component/SearchModule/search");
const locationRoutes = require("../component/Location/location");
const tripRoutes = require("../component/Trip/trip");
module.exports = (app) => {
  app.use("/auth", authRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/searchScreen", searchRoutes);
  app.use("/location", locationRoutes);
  app.use("/trip", tripRoutes);
};
