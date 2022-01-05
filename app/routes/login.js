const router = require("express").Router();

const loginController = require("../app/controllers/LoginController");

router.post("/store", loginController.store);
router.get("/", loginController.index);

module.exports = router;
