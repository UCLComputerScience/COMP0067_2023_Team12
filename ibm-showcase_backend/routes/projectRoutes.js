const projectController = require("../controllers/projectController.js");

var router = require("express").Router();

// Add a new project
router.post("/", projectController.create);

// Project File Upload
// router.use("/upload", fileUpload);
router.post("/upload", projectController.upload);

// Retrieve all projects
router.get("/", projectController.findAll);

// Retrieve all published projects
// router.get("/published", projectController.findAllPublished);

// Retrieve a single project with placement level
router.get("/level/:level", projectController.findOneByLevel);

// Retrieve a single project with id
router.get("/:id", projectController.findOne);

// Retrieve a single project with id without popularity
router.get("/:id/popularity", projectController.findOneWithoutPopularity);

// Retrieve projects that are similar to the ID project
router.get("/:id/similar", projectController.findSimilar);

// Update a project with id
router.put("/:id", projectController.update);

// Delete a project with id
router.delete("/:id", projectController.delete);

// Delete all projects (Alert?)
// router.delete("/", projectController.deleteAll);

//More to add according to design. Search by keyword or tags or categories etc.

module.exports = router;