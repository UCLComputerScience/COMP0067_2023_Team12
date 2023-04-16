// React-related imports
import React, { useState } from 'react';
// Local component imports
import AdminHeader from '../components/AdminHeader';
import DataTable from '../components/ProjectTable';
import Search from '../components/Search';
import Footer from '../components/Footer';
// Style imports
import './Admin.css';


function EditProject() {

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  return (
    <div className="EditProject">
      <div className="EditBody" >
        <AdminHeader />
        <Search onSubmit={setSearchTerm} onSubmit2={setFilterTerm}/>
        <DataTable searchTerm={searchTerm} filterTerm={filterTerm}/>
      </div>
      <Footer/>
    </div>
 

  )
}
export default EditProject