const projectController = require("../controllers/projectController.js");

var router = require("express").Router();

// Add a new project
router.post("/", projectController.create);

// Retrieve all projects
router.get("/", projectController.findAll);

// Retrieve all published projects
router.get("/published", projectController.findAllPublished);

// Retrieve a single project with id
router.get("/:id", projectController.findOne);

// Update a project with id
router.put("/:id", projectController.update);

// Delete a project with id
router.delete("/:id", projectController.delete);

// Delete all projects (Alert?)
router.delete("/", projectController.deleteAll);

//More to add according to design. Search by keyword or tags or categories etc.

module.exports = router;