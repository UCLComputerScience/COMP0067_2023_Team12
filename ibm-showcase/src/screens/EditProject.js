import React from 'react'
import './Admin.css';
import DataTable from '../components/ProjectTable';
import Search from '../components/Search';
import Edit_Buttons from '../components/Edit_Buttons';


function EditProject() {
  return (
    <div className="EditProject">
      <Search/>
      <DataTable />
    </div>
 

  )
}
export default EditProject