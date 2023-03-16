// import * as React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { DataGrid,GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Box, Toolbar,
  IconButton, Typography, Autocomplete, TextField, Paper, InputBase, Divider, Stack,
  Grid } from '@mui/material'

import { Button } from '@mui/material';




const columns = [
  { field: 'projectTitle', headerclassName: 'super-app-theme--header', headerName: 'Project Title', width: 130 },
  { field: 'description',headerName: 'Description', width: 130 },
  { field: 'dateCreated',headerName: 'Date Created', type:'date',width: 130 },
  {
    field: 'lastEdited',
    headerName: 'Lasted Edited',
    type: 'date',
    width: 130,
  },
  {
    field: 'student',
    headerName: 'Students',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  GRID_CHECKBOX_SELECTION_COL_DEF, // move checkbox column to the end
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {

  // const [rowLength, setCount] = useState(0);
  // const [myLength, setMyLength] = useState(myConstant.length);

  // // const rowLengthUpdate = (value) => {
  // //   setCount(rowLength = value);
  // // };

  // const handleUpdateLength = () => {
  //   setMyLength(myConstant.length);
  // };

  // const isButtonDisabled = rowLength > 1;


  return (
    <Container className='projectTable' style={{ height: "567px", width: "1078px"}}>
            <Grid container spacing={0}>
            <Grid xs={0}>
                <Button
                    variant='contained'
                    size='medium'
                    color="inherit"
                    sx={{bgcolor:'#3D70B2',color:'white',textTransform:"none",borderRadius:0}}
                    // disabled={isButtonDisabled} 
                    // onClick={handleButtonClick}
                >
                    Edit
                </Button>
            </Grid>
            <Grid xs={1}>
                <Button
                    variant='contained'
                    size='medium'
                    color="inherit"
                    sx={{bgcolor:'#3D70B2',color:'white',ml:1,textTransform:"none",borderRadius:0}}
                >
                    Delete
                </Button>
            </Grid>
            <Grid xs={10}>
                <Button
                    variant='contained'
                    size='medium'
                    color="inherit"
                    sx={{ justifyContent: "space-between", float: "right",bgcolor:'#3D70B2',color:'white',mb:2,textTransform:"none",borderRadius:0}}
                >
                    Create Workbook
                </Button>
            </Grid>         
        </Grid>
      <DataGrid   sx={{
        bgcolor:'white',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#F4F7FB'
        },
        mx:"auto"
      }}
            rows={rows}
            columns={columns}
            pageSize={9}
            rowsPerPageOptions={[5]}
            checkboxSelection
            // disableSelectionOnClick
            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRowData = rows.filter((row) =>
                selectedIDs.has(row.id)
              );
              console.log(selectedRowData);
              console.log(selectedRowData.length)
              // rowLengthUpdate(selectedRowData.length)
              // rowLength = selectedRowData.length
              
            }}
          />

    </Container>
  );
}

