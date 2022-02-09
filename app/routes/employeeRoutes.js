const express = require("express");
const router = express.Router();
const auth = require("../controllers/Auth");
const employeeController = require("../controllers/EmployeeController.js");
const adminControler=require("../controllers/AdminController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/:orderId",employeeController.mangeOrders);
router.get('/hoadon',verifyToken,employeeController.manageBills);
router.get("/", adminControler.manageCustomers);

module.exports = router;
