module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        user: String,
        password: String,
        published: Boolean
        // user: {
        //   type: String,
        //   required: [true, "Please provide an Email!"],
        //   unique: [true, "Email Exist"],
        // },
      
        // password: {
        //   type: String,
        //   required: [true, "Please provide a password!"],
        //   unique: false,
        // },
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Login = mongoose.model("admin_details", schema);
    return Login;
  };