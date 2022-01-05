const express = require("express");
const router = express.Router();

const siteController = require("../controllers/SiteController");

<<<<<<< HEAD
router.get("/:slug",siteController.detail)
router.get("/", siteController.home)


module.exports = router
=======
router.get("/", siteController.home);

module.exports = router;
>>>>>>> d75e6998c3a5ecb95b2a087135dc20e522691e78
