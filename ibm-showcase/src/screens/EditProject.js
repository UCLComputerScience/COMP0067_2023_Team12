import React from 'react'
import './Admin.css';
import DataTable from '../components/ProjectTable';
import Search from '../components/Search';
import Edit_Buttons from '../components/Edit_Buttons';
import AdminHeader from '../components/AdminHeader'
import Footer from '../components/Footer'


function EditProject() {
  return (
    <div className="EditProject">
      <AdminHeader />
      <Search/>
      <DataTable />
      <Footer/>
    </div>
 

  )
}
export default EditProject