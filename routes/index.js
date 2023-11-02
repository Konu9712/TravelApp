const authRoutes = require("../component/Auth/auth");
const dashboardRoutes = require("../component/Dashboard/dasboard");
const searchRoutes = require("../component/SearchModule/search");

module.exports = (app) => {
  app.use("/auth", authRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/searchScreen", searchRoutes);
};
