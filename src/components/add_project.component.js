import React, { Component } from "react";
import ProjectDataService from "../services/project.service";
import FileBase64 from 'react-file-base64';

export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeGroupMembers = this.onChangeGroupMembers.bind(this);
    this.onChangeSupervisors = this.onChangeSupervisors.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeVideo = this.onChangeVideo.bind(this);
    this.onChangeImages = this.onChangeImages.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.newProject = this.newProject.bind(this);

    this.state = {
      id: null,
      title: "",
      group_members: "",
      supervisors: "",
      description: "",
      video: "",
      images: "",
      category: "",
      tags: "",
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeGroupMembers(e) {
    this.setState({
      group_members: e.target.value
    });
  }

  onChangeSupervisors(e) {
    this.setState({
      supervisors: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeVideo(e) {
    this.setState({
      video: e.target.value
    });
  }

  onChangeImages(e) {
    this.setState({
      images: e
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onChangeTags(e) {
    this.setState({
      tags: e.target.value
    });
  }

  saveProject() {
    var data = {
      title: this.state.title,
      group_members: this.state.group_members,
      supervisors: this.state.supervisors,
      description: this.state.description,
      video: this.state.video,
      images: typeof this.state.images === 'string' ? this.state.images : this.state.images[0].base64,
      category: this.state.category,
      tags: this.state.tags,
    };

    ProjectDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          group_members: response.data.group_members,
          supervisors: response.data.supervisors,
          description: response.data.description,
          video: response.data.video,
          images: response.data.images,
          category: response.data.category,
          tags: response.data.tags,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProject() {
    this.setState({
      id: null,
      title: "",
      group_members: "",
      supervisors: "",
      description: "",
      video: "",
      images: "",
      category: "",
      tags: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProject}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="group_members">Group Members</label>
              <input
                type="text"
                className="form-control"
                id="group_members"
                required
                value={this.state.group_members}
                onChange={this.onChangeGroupMembers}
                name="group_members"
              />
            </div>

            <div className="form-group">
              <label htmlFor="supervisors">Supervisors</label>
              <input
                type="text"
                className="form-control"
                id="supervisors"
                required
                value={this.state.supervisors}
                onChange={this.onChangeSupervisors}
                name="supervisors"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="video">Video</label>
              <input
                type="text"
                className="form-control"
                id="video"
                required
                value={this.state.video}
                onChange={this.onChangeVideo}
                name="video"
              />
            </div>

            <div className="form-group">
              <label htmlFor="images">Images</label>
              {/* <input
                type="file"
                className="form-control"
                id="images"
                required
                onChange={(e) => this.onChangeImages(e.target.files)}
                // value={this.state.images}
                // onChange={this.onChangeImages}
                name="images"
              /> */}
              <FileBase64 
                type="file" 
                id="images" 
                multiple={false} 
                onChange={this.onChangeImages} 
                name="images" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={this.state.category}
                onChange={this.onChangeCategory}
                name="category"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                className="form-control"
                id="tags"
                required
                value={this.state.tags}
                onChange={this.onChangeTags}
                name="tags"
              />
            </div>

            <button onClick={this.saveProject} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}