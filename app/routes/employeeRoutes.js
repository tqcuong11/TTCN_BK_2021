const express = require("express");
const router = express.Router();
const auth = require("../controllers/Auth");
const employeeController = require("../controllers/employeeController.js");
const adminControler=require("../controllers/AdminController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/:orderId",employeeController.mangeOrders);
router.get("/customers", adminControler.manageCustomers);
router.get('/hoadon',verifyToken,employeeController.manageBills);
router.get("/", verifyToken,adminControler.dashboard);

module.exports = router;
