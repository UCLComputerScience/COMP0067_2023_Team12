const projectModel = require("../models/projectModel.js");
var fs = require('fs');

// File Upload Handling
module.exports.upload = (req, res) => {
  //Detect if a file is uploaded
  if (req.files === null) {
      return res.status(400).json({msg:'No file！'})
  }

  const file = req.files.file;

  file.name = file.name.replace(/\s+/g, "_")

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

// The function create is adapated from https://github.com/bezkoder/node-express-mongodb
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

  const modifiedImages = req.body.images.map(image => {
    const modifiedFilename = image.replace(/\s+/g, "_"); 
    return modifiedFilename;
  });

  const modifiedBanner = req.body.bannerImage.map(image => {
    const modifiedFilename = image.replace(/\s+/g, "_"); 
    return modifiedFilename;
  });

  const projectData = {...req.body, images: modifiedImages, bannerImage: modifiedBanner};

  // Create a Project
  const project = new projectModel(projectData,"throw");
  // Save the Project in the database
  project
    .save()
    .then(data => {
      filemove(data.images,data._id.toString())
      filemove(data.bannerImage,data._id.toString())
      res.send(data);
      // console.log(data._id.toString());
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};

// The function update is adapated from https://github.com/bezkoder/node-express-mongodb
// Update a Project by the id in the request
module.exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  function filemove(fileArray, projectID){
    if (!fs.existsSync(`./public/uploads/${projectID}/`)) {
      fs.mkdirSync(`./public/uploads/${projectID}/`, { recursive: true });
    }
    for (let filename of fileArray) {
      if (!fs.existsSync(`./public/uploads/${projectID}/${filename}`)) {
        fs.rename(`./uploads/${filename}`, `./public/uploads/${projectID}/${filename}`, function (err) {
        if (err) throw err;
        console.log('File Moved Successfully!');
        });
    }
    }
    }

  const id = req.params.id;

  console.log(req.body)

  projectModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found!`
        });
      } else {
        filemove(req.body.images,data._id.toString())
        filemove(req.body.bannerImage,data._id.toString())
        res.send({ message: "Project was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

// The function findAll is adapated from https://github.com/bezkoder/node-express-mongodb
// Retrieve all Projects from the database.
module.exports.findAll = (req, res) => {
  const term = req.query.title;
  var condition = term ? {
    $or: [
      { title: { $regex: new RegExp(term, "i") } },
      { tags: { $regex: new RegExp(term, "i") } }
    ]
  } : {};

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

// Find a single Tutorial with an id without adding popularity
exports.findOneWithoutPopularity = (req, res) => {
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

// Find a single project with placement level
module.exports.findOneByLevel = (req, res) => {
  const level = req.params.level;
  projectModel.findOne({placement:level})
    .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Project with level " + level });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Project with level=" + level });
      });
};

// The function findOne is adapated from https://github.com/bezkoder/node-express-mongodb
// Find a single Project with an id
module.exports.findOne = (req, res) => {
  const id = req.params.id;

  projectModel.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Not found Project with id " + id });
      } else {
        data.popularity += 1;
        // console.log(data)
        // update the popularity count by one
        projectModel.findByIdAndUpdate(id, data, { useFindAndModify: false, new: true })
          .then(updatedData => {
            if (!updatedData) {
              res.status(408).send({
                message: `Cannot update Project with id=${id}. Maybe Project was not found!`
              });
            } else {
              res.send(updatedData);
            }
          })
          .catch(err => {
            return res.status(505).send({
              message: "Error updating Project with id=" + id
            });
          });
      }
    })
    .catch(err => { 
      return res
        .status(500)
        .send({ message: "Error retrieving Project with id=" + id });
    });
};

// Find similar projects to one with the ID
module.exports.findSimilar = (req, res) => {
  const id = req.params.id;

  projectModel.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Not found Project with id " + id });
      } else {
        const {category, tags, title} = data;

        const selectedEntryTitleWords = title.toLowerCase().split(' ');

        projectModel.find({
          $or: [
            { category },
            { tags: { $in: tags } },
            { title: { $regex: title.split(' ').join('|') } } 
          ],
          _id: { $ne: id } 
        })
          .then(similarEntries => {
            
            const similarityScores = similarEntries.map(entry => {
              let score = 0;
              if (entry.category === category) {
                score += 5;
              }
              if (entry.tags.some(tag => tags.includes(tag))) {
                score += 1;
              }

              const entryTitleWords = entry.title.toLowerCase().split(' ');

              selectedEntryTitleWords.forEach(word => {
                if (entryTitleWords.includes(word)) {
                  score += 10;
                  // may need to adjust these scores to work best for similar projects
                }
              });
              
              return { entry, score };
            });
            
            const sortedEntries = similarityScores.sort((a, b) => b.score - a.score).map(a => a.entry);

            res.send(sortedEntries);
          })
          .catch(err => {
            res.status(505).send({ message: "Error retrieving similar entries" });
          }); 
      }
    })
    .catch(err => { 
      return res
        .status(500)
        .send({ message: "Error retrieving Project with id=" + id });
    });
};

// The function delete is adapated from https://github.com/bezkoder/node-express-mongodb
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
        fs.rmSync(`./public/uploads/${id}`, { recursive: true });
        console.log('Directory removed!');
        
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
