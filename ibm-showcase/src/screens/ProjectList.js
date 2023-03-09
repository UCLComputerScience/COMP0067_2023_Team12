import React from 'react'
import ProjectSearch from '../components/ProjectSearch'
import Header from '../components/Header'
import ListAllProjects from '../components/infinite_scroll_project_list'



function ProjectList() {
    return (
      <div>
        <Header />
        <ProjectSearch />
        <ListAllProjects/>
      </div>
    )
  }
  export default ProjectList