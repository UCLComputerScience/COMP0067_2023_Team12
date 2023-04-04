const aboutController = require("../controllers/aboutController.js");

var router = require("express").Router();

// Retrieve the about content
router.get("/", aboutController.find);
// Update the about content
router.put("/", aboutController.update);
//One-Time Use Post(Create)
router.post("/", aboutController.create);

module.exports = router;