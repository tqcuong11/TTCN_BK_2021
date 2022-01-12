const router = require("express").Router();

const siteController = require("../controllers/SiteController");
const newUserController = require("../controllers/newUser");
const storeUserController = require("../controllers/storeUser");
const loginController = require("../controllers/login");
const loginUserController = require("../controllers/loginUser");
const authMiddleware = require("../middleware/authMiddleware"); //auth for add cart
const checkAuthMiddleware = require("../middleware/checkAuthMiddleware");
const logoutController = require("../controllers/logout");

router.get("/:slug", siteController.detail);
router.get("/login", loginController.login);
router.get("/register", checkAuthMiddleware, newUserController.register);
router.post("/users/register", checkAuthMiddleware, storeUserController.storeUser);
router.post("/users/login", checkAuthMiddleware, loginUserController.loginUser);
router.get("/logout", logoutController);
router.get("/", siteController.home);
router.use((req, res) => res.render("notfound"));

module.exports = router;
