import React from 'react'
import ProjectSearch from '../components/ProjectSearch'
import Header from '../components/Header'
import ProjectFilter from '../components/ProjectFilters'
import ListAllProjects from '../components/infinite_scroll_project_list'



function ProjectList() {
    return (
      <div>
        <ProjectSearch />
        <ListAllProjects/>
  

     </div>
   
  
    )
  }
  export default ProjectList