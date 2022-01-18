const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/nhanvien", verifyToken, AdminController.manageStaffs);
router.get("/sanpham", verifyToken, AdminController.manageProducts);
router.get("/khachhang", verifyToken, AdminController.manageCustomers);
router.get("/hoadon", AdminController.manageBills);
router.get("/", verifyToken, AdminController.dashboard);

module.exports = router;
