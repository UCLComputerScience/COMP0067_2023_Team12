const mongoose = require("./db.js");

//Use JS naming convention: camelCase
const userSchema = new mongoose.Schema(
  {
  user: String,
  password: String
  },
  { timestamps: true }
);

// projectSchema.method("toJSON", function() {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

//'Projects' is the name of collection(table). Use plural.
const userModel = mongoose.model('Users', userSchema);
module.exports = userModel