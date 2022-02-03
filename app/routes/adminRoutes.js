const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const auth = require("../controllers/Auth");
const verifyToken = require("../middlewares/verifyToken");


router.get("/products",  AdminController.listProducts);
router.get("/newEmployee",  AdminController.newEmployee);
router.post("/addEmployee",  AdminController.addEmployee);
router.get("/newProduct",  AdminController.newProduct);
router.post("/addProduct",  AdminController.addProduct);
router.get("/customers",  AdminController.manageCustomers);
router.get("/hoadon", AdminController.manageBills);
router.get("/",  AdminController.dashboard);

module.exports = router;
