const mongoose = require("./db.js");

const aboutSchema = new mongoose.Schema(
  {
  content: String,
  },
  { collection: 'about' , timestamps: true }
);

const aboutModel = mongoose.model('about', aboutSchema);
module.exports = aboutModel;