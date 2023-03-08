const projectModel = require("../models/projectModel.js");

// Create and Save a new project to DB
module.exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a project
  const project = new projectModel(req.body,"throw");

  // Save the project in the database
  project
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the project."
      });
    });
};


// module.exports =  {
//     create,
//     findAll
// };