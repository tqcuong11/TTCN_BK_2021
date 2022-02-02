const siteRouter = require("./siteRoutes");
const cartRouter = require("./cartRoutes");
const adminRouter = require("./adminRoutes");
const verifyToken= require('../middlewares/verifyToken');
const checkRole=require("../middlewares/checkRole");

function route(app) {
  app.use("/cart", cartRouter);
  app.use("/admin", verifyToken,checkRole.admin,adminRouter);
  app.use("/", siteRouter);
}

module.exports = route;
