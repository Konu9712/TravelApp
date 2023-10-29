const authRoutes = require("../component/Auth/auth");
const dashboardRoutes = require("../component/Dashboard/dasboard");

module.exports = (app) => {
  app.use("/auth", authRoutes);
  app.use("/dashboard", dashboardRoutes);
};
