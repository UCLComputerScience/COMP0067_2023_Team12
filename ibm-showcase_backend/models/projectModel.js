const mongoose = require("./db.js");

const projectSchema = new mongoose.Schema({
	title: String,
	description: String,
	published: Boolean
});

//Projects is the name of collection(table). Use plural.
const projectModel = mongoose.model('Projects', projectSchema);
module.exports = projectModel