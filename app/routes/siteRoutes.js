const router = require("express").Router();

const siteController = require("../controllers/SiteController");
const newUserController = require("../controllers/newUser");

router.get("/:slug", siteController.detail);
router.get("/login", siteController.login);

router.get("/", siteController.home);

module.exports = router;
