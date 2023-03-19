const mongoose = require("./db.js");

//Use JS naming convention: camelCase
const projectSchema = new mongoose.Schema(
	{
	title: String,
	groupMembers: String,
    supervisors: String,
    description: String,
    videoLink: String,
    images: [String], //Or [Buffer]
    category: String,
    tags: [String],
    popularity: { type: Number, default: 0 },
	published: Boolean
	},
	{ timestamps: true }
);

// projectSchema.method("toJSON", function() {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

//'Projects' is the name of collection(table). Use plural.
const projectModel = mongoose.model('Projects', projectSchema);
module.exports = projectModel