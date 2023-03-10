const userController = require("../controllers/userController.js");

var router = require("express").Router();

// Add a new user
router.post("/", userController.create);

// Retrieve all user
router.get("/", userController.findAll);

//More to add according to design. Search by keyword or tags or categories etc.

module.exports = router;