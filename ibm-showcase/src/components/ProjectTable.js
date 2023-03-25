// import React, { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { DataGrid,GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Box, Toolbar,
  IconButton, Typography, Autocomplete, TextField, Paper, InputBase, Divider, Stack,
  Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, navigate } from 'react-router-dom';

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


    function Reload() {
      console.log("I have reloaded")
      axios.get('http://localhost:8080/api/projects')
      .then(res => {
        setTableData(res.data)
        // console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    };

    useEffect(() => {
      if (!searchTerm) {
        var url = `http://localhost:8080/api/projects`
      } else {
        var url = `http://localhost:8080/api/projects?title=${searchTerm}`
      }
  
      axios.get(url)
        .then((response) => {
          if (selectedSort === 1) {
            response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
           }
          if (selectedSort === 2) {
            response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
           }
           if (selectedSort === 3) {
            response.data.sort((a, b) => b.popularity - a.popularity);
           }
          if (selectedFilter === 2) {
            response.data = response.data.filter((item) => item.category === 'AI/ML');
           }
           if (selectedFilter === 3) {
            response.data = response.data.filter((item) => item.category === 'Back-End');
           }
           if (selectedFilter === 4) {
            response.data = response.data.filter((item) => item.category === 'Cloud');
           }
           if (selectedFilter === 5) {
            response.data = response.data.filter((item) => item.category === 'Cyber-Security');
           }
           if (selectedFilter === 6) {
            response.data = response.data.filter((item) => item.category === 'Data Science');
           }
           if (selectedFilter === 7) {
            response.data = response.data.filter((item) => item.category === 'FinTech');
           }
           if (selectedFilter === 8) {
            response.data = response.data.filter((item) => item.category === 'Front-End');
           }
           if (selectedFilter === 9) {
            response.data = response.data.filter((item) => item.category === 'Healthcare');
           }
           if (selectedFilter === 10) {
            response.data = response.data.filter((item) => item.category === 'Quantum');
           }
           if (selectedFilter === 11) {
            response.data = response.data.filter((item) => item.category === 'Sustainability');
           }
  
           const normalisedData = response.data.map((item) => {
            return {
              ...item,
              description: normalizeDescription(item.description)
            }
          });
          
          setItems(normalisedData);
          setIsLoading(false);
          
          if (response.data.length === 0) {
            setNoResults(true);
          } else {
            setNoResults(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }, [currentPage, searchTerm, selectedSort, selectedFilter]);
  
    
  const statusOptions = ["None", "Main", "1", "2", "3"];
  
  const columns = [
    { field: '_id',headerName: 'ID', width: 130 },
    { field: 'title', headerclassName: 'super-app-theme--header', headerName: 'Project Title', width: 130 },
    { field: 'description',headerName: 'Description', width: 130 },
    { field: 'groupMembers', headerclassName: 'super-app-theme--header', headerName: 'Group Members', width: 90 },
    { field: 'createdAt',headerName: 'Date Created',width:130 },
    {
      field: 'updatedAt',
      headerName: 'Last Edited',
      width: 130,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 90,
      renderCell: (params) => {
        return <ActionsCell row={params.row} />
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return <HeaderCell row={params.row} />
      },
    },
  ];

  function HeaderCell({ row }) {
    const [placement, setPlacement] = useState(row.placement || "None");
    const handleChange = (event) => {
      setPlacement(event.target.value);
      // console.log(event.target.value)
      // console.log(row)      

      axios.get(`http://localhost:8080/api/projects`)
      .then(response => {
        response.data = response.data.filter((item) => item.placement === event.target.value);
        if (response.data.length !== 0) {
          var old_data = response.data[0];
          console.log(old_data)
          old_data.placement = 'None'
          axios.put(`http://localhost:8080/api/projects/${old_data._id}`, old_data)
            .then(response => {
              // console.log(response.data);
            })
            .catch(e => {
              console.log(e);
              alert(e.response.data.message)
            });
        }
      })
      .catch(e => {
        console.log(e);
        alert(e.response.data.message)
      });

      // save the updated status to the backend
      var data = row
      data.placement = event.target.value
      axios.put(`http://localhost:8080/api/projects/${row._id}`, data)
      .then(response => {
        // console.log(response.data);
        alert('Successfully edited the placement of this project')
        Reload();
      })
      .catch(e => {
        console.log(e);
        alert(e.response.data.message)
      });

      
    };
    return (
      <FormControl>
        <Select value={placement} onChange={handleChange}>
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  
  function ActionsCell({ row }) {
    const navigate = useNavigate();
    const handleEdit = (event) => {
      // event.stopPropagation();
      navigate(`/editproject/${row._id}`);
    };
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleDelete = (event) => {  
      // event.stopPropagation();  
      axios.delete(`http://localhost:8080/api/projects/${row._id}`)
        .then(response => {
          alert(`Successfully deleted the ${row.title} project`)
          // this.setState({changePage: true})
          Reload();
          
        })
        .catch(e => {
          // console.log(e);
          alert(e.response.data.message)
        });
      setOpen(false);
    };
  
    return (
      <>
        <IconButton aria-label="edit" component="span" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" component="span" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this row?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  

  return (
    <Container className='projectTable' style={{ height: "567px", width: "1078px"}}>
            <Grid container spacing={0}>
            <Grid xs={0}>
                {/* <Button
                    variant='contained'
                    size='medium'
                    color="inherit"
                    sx={{bgcolor:'#3D70B2',color:'white',textTransform:"none",borderRadius:0}}
                    // disabled={isButtonDisabled} 
                    // onClick={handleButtonClick}
                >
                    Edit
                </Button> */}
            </Grid>
            <Grid xs={1}>
                {/* <Button
                    variant='contained'
                    size='medium'
                    color="inherit"
                    sx={{bgcolor:'#3D70B2',color:'white',ml:1,textTransform:"none",borderRadius:0}}
                >
                    Delete
                </Button> */}
            </Grid>
            <Grid xs={10}>
                <Button 
                    variant='contained'
                    size='medium'
                    color="inherit"
                    sx={{ justifyContent: "space-between", float: "right",bgcolor:'#3D70B2',color:'white',mb:2,textTransform:"none",borderRadius:0}}
                >
                    Export Workbook
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
        onRowClick={(event) => {
          if (event.target.tagName === "BUTTON") {
            event.stopPropagation();
          }
        }}
      />

    </Container>
  );
}

