const router = require("express").Router();

const siteController = require("../controllers/SiteController");
const authinUserController = require("../controllers/authUser");
const checkAuthMiddleware = require("../middleware/checkAuthMiddleware");

router.get("/:slug", siteController.detail);
router.get("/login", siteController.login);
router.get("/register", checkAuthMiddleware, siteController.register);
router.post("/auth/register", checkAuthMiddleware, authinUserController.storeUser);
router.post("/auth/login", checkAuthMiddleware, authinUserController.loginUser);
router.get("/logout", siteController.logout);
router.get("/", siteController.home);
router.use((req, res) => res.render("notfound"));

module.exports = router;
