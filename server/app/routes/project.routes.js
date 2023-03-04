module.exports = app => {
    const project_list = require("../controllers/project.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Project
    router.post("/", project_list.create);
  
    // Retrieve all Projects
    router.get("/", project_list.findAll);
  
    // Retrieve all published Projects
    router.get("/published", project_list.findAllPublished);
  
    // Retrieve a single Project with id
    router.get("/:id", project_list.findOne);
  
    // Update a Project with id
    router.put("/:id", project_list.update);
  
    // Delete a Project with id
    router.delete("/:id", project_list.delete);
  
    // Create a new Project not sure about this chief
    router.delete("/", project_list.deleteAll);
  
    app.use("/api/project_list", router);
  };