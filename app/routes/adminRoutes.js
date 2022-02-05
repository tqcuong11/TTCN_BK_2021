const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const auth = require("../controllers/Auth");
const verifyToken = require("../middlewares/verifyToken");

router.get("/manage-products", AdminController.listProducts);
router.get("/manage-employees", AdminController.newEmployee);
router.post("/addEmployee", AdminController.addEmployee);
router.get("/new-product", AdminController.newProduct);
router.post("/addProduct", AdminController.addProduct);
router.get("/customers", AdminController.manageCustomers);
router.get("/hoadon", AdminController.manageBills);
router.get("/", AdminController.dashboard);

module.exports = router;
