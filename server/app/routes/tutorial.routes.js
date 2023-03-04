module.exports = app => {
  const project_list = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", project_list.create);

  // Retrieve all Tutorials
  router.get("/", project_list.findAll);

  // Retrieve all published Tutorials
  router.get("/published", project_list.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", project_list.findOne);

  // Update a Tutorial with id
  router.put("/:id", project_list.update);

  // Delete a Tutorial with id
  router.delete("/:id", project_list.delete);

  // Create a new Tutorial not sure about this chief
  router.delete("/", project_list.deleteAll);

  app.use("/api/project_list", router);
};
