const mongoose = require("./db.js");

//Use JS naming convention: camelCase
const tokenSchema = new mongoose.Schema(
  {
  user: String,
  token: String
  },
  { timestamps: true }
);

// projectSchema.method("toJSON", function() {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

//'Projects' is the name of collection(table). Use plural.
const tokenModel = mongoose.model('Tokens', tokenSchema);
module.exports = tokenModel