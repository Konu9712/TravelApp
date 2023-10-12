const authRoutes = require("../component/auth");

module.exports = (app) => {
  app.use("/auth", authRoutes);
};
