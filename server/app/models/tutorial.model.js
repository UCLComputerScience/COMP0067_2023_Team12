module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      group_members: String,
      supervisors: String,
      description: String,
      video: String,
      images: String,
      category: String,
      tags: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ProjectList = mongoose.model("project_list", schema);
  return ProjectList;
};
