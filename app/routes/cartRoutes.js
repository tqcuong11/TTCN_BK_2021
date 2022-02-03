const router = require("express").Router();
const cartController = require("../controllers/CartController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/delete/:id", verifyToken, cartController.delete);
router.get("/add/:id", verifyToken, cartController.addProduct);
router.get("/", verifyToken, cartController.index);

module.exports = router;
