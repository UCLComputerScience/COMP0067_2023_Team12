import {React, useState} from 'react'
import './Admin.css';
import DataTable from '../components/ProjectTable';
import Search from '../components/Search';
import Edit_Buttons from '../components/Edit_Buttons';
import AdminHeader from '../components/AdminHeader'
import Footer from '../components/Footer'


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