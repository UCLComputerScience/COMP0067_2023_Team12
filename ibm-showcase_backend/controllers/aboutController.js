const aboutModel = require("../models/aboutModel.js");


// Retrieve about description from the database.
module.exports.find = (req, res) => {
  aboutModel.findOne({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving About content."
      });
    });
};

// Update about description
module.exports.update = (req, res) => {
  // if (!req.body) {
  //   return res.status(400).send({
  //     message: "Data to update can not be empty!"
  //   });
  // }
  aboutModel.findOneAndUpdate({}, req.body, { new: true })
    .then(data => {
      res.send({ message: "About Description was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating About Description"
      });
    });
};

module.exports.create = (req, res) => {
  console.log(req.body)
  // Validate request
  if (!req.body.content) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Project
  const about = new aboutModel(req.body,"throw");
  // Save the Project in the database
  about
    .save()
    .then(data => {
      res.send(data);
      console.log(data._id.toString());
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};