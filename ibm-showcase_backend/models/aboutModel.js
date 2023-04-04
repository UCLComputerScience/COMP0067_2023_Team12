const mongoose = require("./db.js");

const aboutSchema = new mongoose.Schema(
  {
  description: String,
  },
  { timestamps: true }
);

const aboutModel = mongoose.model('AboutDescription', aboutSchema);
module.exports = aboutModel;