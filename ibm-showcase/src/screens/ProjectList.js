import React from 'react'
import ProjectSearch from '../components/ProjectSearch'
import Header from '../components/Header'
import ListAllProjects from '../components/infinite_scroll_project_list'
// import AddProject from '../components/add_projects'



function ProjectList() {
  document.body.style = 'background: white;';

  const [searchTerm, setSearchTerm] = useState('');

    return (
      <div>
        <Header  />
        <ProjectSearch castData={setSearchTerm} />
        <ListAllProjects castData={searchTerm}/>
        {/* <AddProject/> */}

      </div>
    )
  }
  export default ProjectList