const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signupController);
router.post("/login", authController.loginController);

module.exports = router;
