import { React, useState} from 'react'
import ProjectSearch from '../components/ProjectSearch'
import Header from '../components/Header'
import ListAllProjects from '../components/infinite_scroll_project_list'
// import AddProject from '../components/add_projects'
import Footer from '../components/Footer'


function ProjectList() {
  document.body.style = 'background: white;';

  const [searchTerm, setSearchTerm] = useState('');
  // console.log(searchTerm)

    return (
      <div>
        <Header  />
        <ProjectSearch onSubmit={setSearchTerm} />
        <ListAllProjects searchTerm={searchTerm}/>
        <Footer />
        {/* <AddProject/> */}

      </div>
    )
  }
  export default ProjectList