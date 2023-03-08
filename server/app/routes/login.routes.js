module.exports = app => {
    const admin_details = require("../controllers/login.controller.js");

    var router = require("express").Router();

    // Create a new Project
    router.post("/", admin_details.create);

    // Retrieve all Projects
    router.get("/", admin_details.findAll);

    // Retrieve all published Projects
    router.get("/published", admin_details.findAllPublished);

    // Retrieve a single Project with id
    router.get("/:id", admin_details.findOne);

    // Update a Project with id
    router.put("/:id", admin_details.update);

    // Delete a Project with id
    router.delete("/:id", admin_details.delete);

    // Create a new Project not sure about this chief
    router.delete("/", admin_details.deleteAll);

    app.use("/api/admin_details", router);
};