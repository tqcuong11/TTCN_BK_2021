const router = require("express").Router();

const siteController = require("../controllers/SiteController");

router.get("/:slug", siteController.detail);
router.post("/login",)
router.get("/login", siteController.login);
router.get("/register", siteController.register);
router.get("/", siteController.home);

module.exports = router;
