import React, { useState, useEffect, useRef } from 'react';
import { DataGrid,GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Box, Toolbar,
  IconButton, Typography, Autocomplete, TextField, Paper, InputBase, Divider, Stack,
  Grid } from '@mui/material'

import { Button } from '@mui/material';
import axios from "axios";

function generateRandom() {
  var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}


export default function DataTable () {


    const [tableData,setTableData] = useState([])

    React.useEffect(() => {
      axios.get('http://localhost:8080/api/projects')
      .then(res => {
        setTableData(res.data)
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
     
    },[]);
  
    

  
  const columns = [
    { field: '_id',headerName: 'ID', width: 130 },
    { field: 'title', headerclassName: 'super-app-theme--header', headerName: 'Project Title', width: 130 },
    { field: 'description',headerName: 'Description', width: 130 },
    { field: 'groupMembers', headerclassName: 'super-app-theme--header', headerName: 'Group Members', width: 130 },
    { field: 'createdAt',headerName: 'Date Created',width:130 },
    {
      field: 'updatedAt',
      headerName: 'Last Edited',
      width: 130,
    },
  
  ];
  

  return (
    <Container className='projectTable' style={{ height: "567px", width: "1078px"}}>
            <Grid container spacing={0}>
            <Grid xs={0}>
                <Button
                    variant='contained'
                    size='medium'
                    color="inherit"
                    sx={{bgcolor:'#3D70B2',color:'white',textTransform:"none",borderRadius:0}}
                    
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
        getRowId={(row) => row._id}
        rows = {tableData}
        onRowSelectionModelChange = {(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = tableData.filter((row) => 
          selectedIDs.has(row._id)
          
          );
        

          console.log(selectedRowData);
        }}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

    </Container>
  );
}

