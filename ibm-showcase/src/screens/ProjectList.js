// React-related imports
import { React, useState } from 'react';
// Local component imports
import Header from '../components/Header';
import ProjectSearch from '../components/ProjectSearch';
import ListAllProjects from '../components/infinite_scroll_project_list';
import Footer from '../components/Footer';


function ProjectList() {
  document.body.style = 'background: white;';

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  // console.log(searchTerm)

    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1 }}>
          <Header  />
          <ProjectSearch onSubmit={setSearchTerm} searchInput={searchTerm2} />
          <ListAllProjects searchTerm={searchTerm} searchTermBack={setSearchTerm2}/>
        </div>
        <Footer />
        {/* <AddProject/> */}
      </div>
    )
  }
  export default ProjectList

