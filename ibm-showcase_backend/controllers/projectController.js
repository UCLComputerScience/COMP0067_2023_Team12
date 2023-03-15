const projectModel = require("../models/projectModel.js");
var fs = require('fs');

// File Upload Handling
module.exports.upload = (req, res) => {
  //Detect if a file is uploaded
  if (req.files === null) {
      return res.status(400).json({msg:'No file！'})
  }

  const file = req.files.file;

  //Move the file to the specified directory
  //TO-DO: Rename to ID to ensure unique filename and easier to read
  file.mv(`./uploads/${file.name}`, err => {
      if (err) {
          console.log(err);
          return res.status(500).send(err);
      }
      res.json({
          fileName: file.name
          // filePath:`/upload/${file.name}`
      })
  })
};

// Create and Save a new Project to DB
module.exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  function filemove(fileArray, projectID){
    if (!fs.existsSync(`./public/uploads/${projectID}/`)) {
      fs.mkdirSync(`./public/uploads/${projectID}/`, { recursive: true });
    }
    for (let filename of fileArray) {
      fs.rename(`./uploads/${filename}`, `./public/uploads/${projectID}/${filename}`, function (err) {
      if (err) throw err;
      console.log('File Moved Successfully!');
      });
    }
  }

  // Create a Project
  const project = new projectModel(req.body,"throw");
  // Save the Project in the database
  project
    .save()
    .then(data => {
      filemove(data.images,data._id.toString())
    })
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

// Following code has not been tested.
// Retrieve all Projects from the database.
module.exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  projectModel.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Projects."
      });
    });
};

// Find all published Projects
module.exports.findAllPublished = (req, res) => {
  projectModel.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Projects."
      });
    });
};

// Find a single Project with an id
module.exports.findOne = (req, res) => {
  const id = req.params.id;

  projectModel.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Project with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Project with id=" + id });
    });
};

// Update a Project by the id in the request
module.exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  projectModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found!`
        });
      } else res.send({ message: "Project was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

// Delete a Project with the specified id in the request
module.exports.delete = (req, res) => {
  const id = req.params.id;

  projectModel.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
        });
      } else {
        res.send({
          message: "Project was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};

// Delete all Projects from the database.
module.exports.deleteAll = (req, res) => {
  projectModel.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Projects were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Projects."
      });
    });
};


// module.exports =  {
//     create,
//     findAll
// };