const aboutModel = require("../models/aboutModel.js");


// Retrieve about description from the database.
module.exports.find = (req, res) => {
  aboutModel.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving About Description."
      });
    });
};

// Update about description
module.exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  aboutModel.findOneAndUpdate({}, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update About Description!`
        });
      } else res.send({ message: "About Description was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating About Description"
      });
    });
};