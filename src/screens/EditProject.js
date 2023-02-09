import React from 'react'
import '../Admin.css';
import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
  } from 'carbon-components-react';


  const rows = [
    {
      id: 'a',
      name: 'Load balancer 1',
      status: 'Disabled',
    },
    {
      id: 'b',
      name: 'Load balancer 2',
      status: 'Starting',
    },
    {
      id: 'c',
      name: 'Load balancer 3',
      status: 'Active',
    },
  ];

  const headers = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'status',
      header: 'Status',
    },
  ];



const EditProject = () => {

    return (
      <div>

<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>
      </div>
    )
}

export default EditProject