const userController = require("../controllers/userController.js");

var router = require("express").Router();

// // Change Password
// router.post("/change-password", userController.Password);

// Login
router.post("/login", userController.Login);

// Register
router.post("/register", userController.Register);

//More to add according to design. Search by keyword or tags or categories etc.

module.exports = router;