    const projectController = require("../controllers/projectController.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", projectController.create);

    module.exports = router;