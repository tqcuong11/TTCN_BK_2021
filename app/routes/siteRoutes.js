const router = require("express").Router();

const siteController = require("../controllers/SiteController");

router.get("/:slug",siteController.detail)
router.get("/", siteController.home)


module.exports = router
