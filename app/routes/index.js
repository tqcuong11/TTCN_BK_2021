const siteRouter = require("./siteRoutes");
const cartRouter=require("./cartRoutes");

function route(app) {
  app.use("/cart",cartRouter);
  app.use("/", siteRouter);
}

module.exports = route;
