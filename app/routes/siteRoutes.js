const express = require("express");
const router = express.Router();

const siteController = require("../controllers/SiteController");

router.get("/:slug",siteController.detail)
router.get("/", siteController.home)


module.exports = router
