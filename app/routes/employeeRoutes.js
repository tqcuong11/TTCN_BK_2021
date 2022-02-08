const express = require("express");
const router = express.Router();
const auth = require("../controllers/Auth");
const employeeController = require("../controllers/employeeController.js");
const verifyToken = require("../middlewares/verifyToken");

router.patch('/:customerId',verifyToken,employeeController.updateInfo);
router.get('/info',verifyToken,employeeController.infoUser);
router.get("/customers",  employeeController.manageCustomers);
router.post('/order',verifyToken,employeeController.addOrder);
router.get('/order',verifyToken,employeeController.order);
router.get('/hoadon',verifyToken,employeeController.manageBills);
router.get("/login", employeeController.login);
router.post("/login", employeeController.login);
router.get("/register", employeeController.register);
router.post("/register", auth.register);
router.get("/search", verifyToken, employeeController.search);
router.get("/logout", employeeController.logout);
router.get("/:slug", verifyToken, employeeController.detail);
router.get("/", verifyToken,employeeController.home);

module.exports = router;
