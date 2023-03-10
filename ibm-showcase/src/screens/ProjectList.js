import React from 'react'
import ProjectSearch from '../components/ProjectSearch'
import Header from '../components/Header'
import ListAllProjects from '../components/infinite_scroll_project_list'
// import AddProject from '../components/add_projects'



function ProjectList() {
  document.body.style = 'background: white;';
    return (
      <div>
        <Header />
        <ProjectSearch />
        <ListAllProjects/>
        {/* <AddProject/> */}

      </div>
    )
  }
  export default ProjectList