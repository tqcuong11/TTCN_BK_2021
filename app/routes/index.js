const siteRouter = require("./siteRoutes");
const cartRouter = require("./cartRoutes");
const adminRouter = require("./adminRoutes");

function route(app) {
  app.use("/cart", cartRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);
}

module.exports = route;
