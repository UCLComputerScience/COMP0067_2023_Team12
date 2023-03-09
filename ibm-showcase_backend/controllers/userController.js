const userModel = require("../models/userModel.js");

// Create and Save a new User to DB
module.exports.create = (req, res) => {
  // Validate request
  if (!req.body.user) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new userModel(req.body,"throw");

  // Save the User in the database
  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Following code has not been tested.
// Retrieve all Users from the database.
module.exports.findAll = (req, res) => {
  const user = req.query.user;
  var condition = user ? { user: { $regex: new RegExp(title), $options: "i" } } : {};

  userModel.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};
