const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/initialProtect").get(authController.initialProtect);

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/forgotPassword").post(authController.forgotPassword);

// Protect all routes after this middleware
router.use(authController.protect);

module.exports = router;
