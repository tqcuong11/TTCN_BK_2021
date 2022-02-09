const siteRouter = require("./siteRoutes");
const cartRouter = require("./cartRoutes");
const adminRouter = require("./adminRoutes");
const employeeRouter = require("./employeeRoutes")
const verifyToken= require('../middlewares/verifyToken');
const checkRole=require("../middlewares/checkRole");

function route(app) {
  app.use("/cart", cartRouter);
  app.use("/admin", verifyToken,checkRole.admin,adminRouter);
  app.use("/employee", verifyToken,checkRole.employee,employeeRouter);
  app.use("/", siteRouter);
}

module.exports = route;
