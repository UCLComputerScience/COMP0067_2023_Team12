const userController = require("../controllers/userController.js");
const passwordResetController = require('../controllers/passwordResetController.js')

var router = require("express").Router();

// Login
router.post("/login", userController.Login);

// Register
router.post("/register", userController.Register);

// Change Password
router.post("/change_password", userController.ChangePassword);

// Send Password Reset Link
router.post("/send_password_link", passwordResetController.SendPasswordLink);

// Verify Reset Link
router.post("/verify_link", passwordResetController.VerifyLink);

module.exports = router;