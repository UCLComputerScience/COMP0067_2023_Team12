import React, { Component } from "react";
import LoginDataService from "../services/login.service";
import { Link } from "react-router-dom";
import ListAllProjects from "./infinite_scroll_project_list";

export default class LoginList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUser = this.onChangeSearchUser.bind(this);
    this.retrieveProjects = this.retrieveProjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProject = this.setActiveProject.bind(this);
    this.removeAllProjects = this.removeAllProjects.bind(this);
    this.searchUser = this.searchUser.bind(this);

    this.state = {
      projects: [],
      currentProject: null,
      currentIndex: -1,
      searchUser: ""
    };
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  onChangeSearchUser(e) {
    const searchUser = e.target.value;

    this.setState({
      searchUser: searchUser
    });
  }

  retrieveProjects() {
    LoginDataService.getAll()
      .then(response => {
        this.setState({
          projects: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProjects();
    this.setState({
      currentProject: null,
      currentIndex: -1
    });
  }

  setActiveProject(project, index) {
    this.setState({
      currentProject: project,
      currentIndex: index
    });
  }

  removeAllProjects() {
    LoginDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchUser() {
    this.setState({
      currentProject: null,
      currentIndex: -1
    });

    LoginDataService.findByUser(this.state.searchUser)
      .then(response => {
        this.setState({
          projects: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchUser, projects, currentProject, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchUser}
              onChange={this.onChangeSearchUser}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchUser}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Projects List</h4>

          <ul className="list-group">
            {projects &&
              projects.map((project, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProject(project, index)}
                  key={index}
                >
                  {project.user}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProjects}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProject ? (
            <div>
              <h4>Project</h4>
              <div>
                <label>
                  <strong>User:</strong>
                </label>{" "}
                {currentProject.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentProject.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentProject.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/projects/" + currentProject.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Project...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}