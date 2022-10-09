const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/initialProtect").get(authController.initialProtect);

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.patch("/updateMe", userController.updateMe);

module.exports = router;
