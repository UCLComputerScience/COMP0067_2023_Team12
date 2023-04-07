// import React, { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { DataGrid,GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Box, Toolbar,
  IconButton, Typography, Autocomplete, TextField, Paper, InputBase, Divider, Stack,
  Grid, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, navigate } from 'react-router-dom';

import { Button } from '@mui/material';
import axios from "axios";


export default function DataTable({ searchTerm, filterTerm }) {


    const [tableData,setTableData] = useState([])

    const categories = ["AI/ML", "Back-End", "Cloud", "Cyber-Security", "Data Science", "FinTech", "Front-End", "Healthcare", "Quantum", "Sustaianability"]

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
      axios.get('http://localhost:8080/api/projects')
      .then(res => {
        setTableData(res.data)
        // console.log(res.data)
      }).catch(err => {
        // console.log(err)
        setError(err.response.data.message)
      })
     
    },[]);

    useEffect(() => {  
      Reload();
    }, [searchTerm, filterTerm]);

    function Reload() {
      if (!searchTerm) {
        var url = `http://localhost:8080/api/projects`
      } else {
        var url = `http://localhost:8080/api/projects?title=${searchTerm}`
      }
  
      axios.get(url)
        .then((response) => {
          var filter_val = Math.max(filterTerm - 1, 0)
          if (filter_val > 0) {
            response.data = response.data.filter((item) => item.category === categories[filter_val-1]);
          }
  
          //  const normalisedData = response.data.map((item) => {
          //   return {
          //     ...item,
          //     description: normalizeDescription(item.description)
          //   }
          // });
          
          // setTableData(normalisedData);
          setTableData(response.data);
        })
        .catch((e) => {
          // console.log(error);
          setError(e.response.data.message)
        });
    }

    function normalizeDescription(description) {
      const maxLength = 100; 
      if (description.length <= maxLength) {
        return description;
      } else {
        const truncated = description.slice(0, maxLength); 
        const lastSpaceIndex = truncated.lastIndexOf(' '); 
        const normalized = truncated.slice(0, lastSpaceIndex) + '...'; 
        return normalized;
      }
    }

    
  
    
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
      headerName: "Placement",
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
      
      // check if any other projects have the value you want to change to
      axios.get(`http://localhost:8080/api/projects`)
      .then(response => {
        response.data = response.data.filter((item) => item.placement === event.target.value && item.placement !== "None");
        if (response.data.length !== 0) {
          var old_data = response.data[0];
          // console.log(old_data)
          // console.log(placement)
          old_data.placement = placement
          axios.put(`http://localhost:8080/api/projects/${old_data._id}`, old_data)
            .then(response => {
              // console.log(response.data);
            })
            .catch(e => {
              console.log(e);
              setError(e.response.data.message)
            });

          // save the updated status to the backend
          axios.get(`http://localhost:8080/api/projects/${row._id}`)
          .then(response => {
              response.data.placement = event.target.value;
              axios.put(`http://localhost:8080/api/projects/${row._id}`, response.data)
                .then(response => {
                  // console.log(response.data);
                  setSuccess('Successfully edited the placement of this project.')
                  Reload();
                })
                .catch(e => {
                  console.log(e);
                  setError(e.response.data.message)
                });
          });
        } else {
          setError("You can't change this value as there needs to be at least one of each kind of placement!!")
          setPlacement(row.placement);
        }
      })
      .catch(e => {
        console.log(e);
        setError(e.response.data.message)
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
    const [open2, setOpen2] = useState(false);

    const handleClickOpen = () => {
      if (row.placement !== "None") {
        setOpen2(true);
      } else{
        setOpen(true);
      }
      
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleClose2 = () => {
      setOpen2(false);
    };

    const handleDelete = (event) => {  
      // event.stopPropagation();  
      axios.delete(`http://localhost:8080/api/projects/${row._id}`)
        .then(response => {
          setSuccess(`Successfully deleted the ${row.title} project`)
          // this.setState({changePage: true})
          Reload();
          
        })
        .catch(e => {
          setError(e.response.data.message)
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

        <Dialog open={open2} onClose={handleClose2}>
          <DialogContent>
          You can't delete a row that has a placement other than "None".
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2} color="primary">
              Cancel
            </Button>
            </DialogActions>
        </Dialog>
      </>
    );
  }
  

  return (
    <Container className='projectTable' style={{ height: "567px", width: "1078px"}}>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" onClose={() => setSuccess(null)}>
                {success}
              </Alert>
            )}
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
        

          // console.log(selectedRowData);
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

