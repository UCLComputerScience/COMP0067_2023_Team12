const aboutController = require("../controllers/aboutController.js");

var router = require("express").Router();

// Retrieve the about content
router.get("/about", aboutController.find);
// Update the about content
router.put("/about", aboutController.update);

module.exports = router;