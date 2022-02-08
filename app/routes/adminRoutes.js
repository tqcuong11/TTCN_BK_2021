const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const siteController=require("../controllers/SiteController");
const verifyToken = require("../middlewares/verifyToken");


router.post('/manage/:userId',AdminController.blockActive);
router.post("/manage-products", siteController.getProduct);
router.get("/manage-products", AdminController.listProducts);
router.get("/manage-employees", AdminController.newEmployee);
router.post("/addEmployee", AdminController.addEmployee);
router.get("/new-product", AdminController.newProduct);
router.post("/addProduct", AdminController.addProduct);
router.get("/customers", AdminController.manageCustomers);
router.get("/hoadon", AdminController.manageBills);
router.get("/", AdminController.dashboard);

module.exports = router;
