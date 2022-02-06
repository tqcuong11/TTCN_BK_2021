const express = require("express");
const router = express.Router();
const auth = require("../controllers/Auth");
const siteController = require("../controllers/SiteController");
const verifyToken = require("../middlewares/verifyToken");

router.patch('/:customerId',verifyToken,siteController.updateInfo);
router.get('/info',verifyToken,siteController.infoUser)
router.post('/order',verifyToken,siteController.addOrder);
router.get('/order',verifyToken,siteController.order);
router.get("/login", siteController.login);
router.post("/login", auth.login);
router.get("/register", siteController.register);
router.post("/register", auth.register);
router.get("/search", verifyToken, siteController.search);
router.get("/logout", siteController.logout);
router.get("/:slug", verifyToken, siteController.detail);
router.post("/",siteController.getProduct);
router.get("/", verifyToken, siteController.home);

module.exports = router;
