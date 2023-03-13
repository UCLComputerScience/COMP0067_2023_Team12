var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

const authConfig = require("../config/authConfig.js");

const userModel = require("../models/userModel.js");



// Create and Save a new User to DB
module.exports.Register = (req, res) => {
  // Validate request
  if (!req.body.user) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new userModel({
    user: req.body.user,
    password: bcrypt.hashSync(req.body.password, 8),
  });

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

module.exports.Login = (req, res) => {

  userModel.findOne({ user: req.body.user })
  .then(data => {
    if (!data)
      return res.status(404).send({ message: "Not found user with username " + req.body.user});
    else
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );
      // console.log(passwordIsValid);

      // console.log(data);
    
      if (passwordIsValid) {
        var token = jwt.sign({id: data.user}, authConfig.secret, {expiresIn: 86400}
        );
        return res.status(200).send(token);
      } else {
        return res.status(401).send({ message: "Wrong Password !!" });
      }
  })
  
  .catch(err => {
    return res
      .status(500)
      .send({ message: "Error retrieving Project with id = " + req.body.user });
  });
};
