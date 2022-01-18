const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const auth = require("../controllers/Auth");
const verifyToken = require("../middlewares/verifyToken");

router.get("/employees", verifyToken, AdminController.listEmployees);
router.get("/products", verifyToken, AdminController.listProducts);
router.get("/newEmployee", verifyToken, AdminController.newEmployee);
router.post("/addEmployee", verifyToken, AdminController.addEmployee);
router.get("/newProduct", verifyToken, AdminController.newProduct);
router.post("/addProduct", verifyToken, AdminController.addProduct);
router.get("/customers", verifyToken, AdminController.manageCustomers);
router.get("/hoadon", AdminController.manageBills);
router.get("/", verifyToken, AdminController.dashboard);

module.exports = router;
