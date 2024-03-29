// THe fucntion ExportToPDF2 is adapted from https://stackoverflow.com/questions/19272933/jspdf-multi-page-pdf-with-html-renderer
// import React, { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect} from 'react';
import { DataGrid} from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Select, MenuItem,  FormControl, IconButton, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import axios from "axios";
import jsPDF from 'jspdf';
import pdfbackground from './pdfbackground.jpg';
import projectbackground from './projectbackground.jpg';


export default function DataTable({ searchTerm, filterTerm }) {

    const [selectedRowData, setSelectedRowData] = useState([])

    const [tableData,setTableData] = useState([])

    const categories = ["AI", "Asset Management", "Automation", "Blockchain", "Capstone", "Cloud", "Data Science", "Design Thinking", "Healthcare", "IT", "Security", "Supply Chain"]

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    // unsure if need this
    // useEffect(() => {
    //   axios.get('http://localhost:8080/api/projects')
    //   .then(res => {
    //     setTableData(res.data)
    //     // console.log(res.data)
    //   }).catch(err => {
    //     // console.log(err)
    //     setError(err.response.data.message)
    //   })
     
    // },[]);


    useEffect(() => {  
      Reload();
    }, [searchTerm, filterTerm]);

    function Reload() {
      if (!searchTerm) {
        var url = process.env.REACT_APP_API_URL+`projects`
      } else {
        var url = process.env.REACT_APP_API_URL+`projects?title=${searchTerm}`
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

          // console.log(response.data)

          const modifiedData = response.data.map(entry => {
            const slicedDateCreated = entry.createdAt.slice(0, 10);
            const slicedDateUpdated = entry.updatedAt.slice(0, 10);
            return { ...entry, createdAt: slicedDateCreated, updatedAt: slicedDateUpdated };
          });
          
          setTableData(modifiedData);
          // setTableData(response.data);
        })
        .catch((e) => {
          // console.log(error);
          setError(e.response.data.message)
        });
    }

    // function normalizeDescription(description) {
    //   const maxLength = 100; 
    //   if (description.length <= maxLength) {
    //     return description;
    //   } else {
    //     const truncated = description.slice(0, maxLength); 
    //     const lastSpaceIndex = truncated.lastIndexOf(' '); 
    //     const normalized = truncated.slice(0, lastSpaceIndex) + '...'; 
    //     return normalized;
    //   }
    // }

    
  const statusOptions = ["None", "Main", "1", "2", "3"];
  
  const columns = [
    { field: '_id',headerName: 'ID', width: 130 },
    { field: 'title', headerclassName: 'super-app-theme--header', headerName: 'Project Title', width: 285 },
    // { field: 'description',headerName: 'Description', width: 130 },
    {field:'supervisors',headerName:'Supervisor',width:160},
    { field: 'groupMembers', headerclassName: 'super-app-theme--header', headerName: 'Group Members', width: 230 },
    { field: 'createdAt',headerName: 'Date Created',width:98 },
    {field: 'updatedAt', headerName: 'Last Edited', width: 98 },
    {field: 'actions', headerName: 'Actions', width: 90,
      renderCell: (params) => {
        return <ActionsCell row={params.row} />
      },
    },
    {field: "status", headerName: "Placement", width: 105,
      renderCell: (params) => {
        return <HeaderCell row={params.row} columnWidth={params.colDef.width} />
      },
    },
  
  ];

  function HeaderCell({ row, columnWidth }) {
    const [placement, setPlacement] = useState(row.placement || "None");
    const handleChange = (event) => {
      setPlacement(event.target.value);
      
      // check if any other projects have the value you want to change to
      axios.get(process.env.REACT_APP_API_URL+`projects`)
      .then(response => {
        response.data = response.data.filter((item) => item.placement === event.target.value && item.placement !== "None");
        if (response.data.length !== 0) {
          var old_data = response.data[0];
          // console.log(old_data)
          // console.log(placement)
          old_data.placement = placement
          axios.put(process.env.REACT_APP_API_URL+`projects/${old_data._id}`, old_data)
            .then(response => {
              // console.log(response.data);
            })
            .catch(e => {
              // console.log(e);
              setError(e.response.data.message)
            });

          // save the updated status to the backend
          axios.get(process.env.REACT_APP_API_URL+`projects/${row._id}`)
          .then(response => {
              response.data.placement = event.target.value;
              axios.put(process.env.REACT_APP_API_URL+`projects/${row._id}`, response.data)
                .then(response => {
                  // console.log(response.data);
                  setSuccess('Successfully edited the placement of this project.')
                  Reload();
                })
                .catch(e => {
                  // console.log(e);
                  setError(e.response.data.message)
                });
          });
        } else {
          setError("You can't change this value as there needs to be at least one of each kind of placement!!")
          setPlacement(row.placement);
        }
      }) 
      .catch(e => {
        // console.log(e);
        setError(e.response.data.message)
      });   
      
    };
    return (
      <FormControl sx={{
        width: `${columnWidth}px`, 
      }}>
        <Select value={placement} onChange={handleChange} sx={{width: '100%', textAlign: 'center'}} inputProps={{sx: {textAlign: 'center'},}}>
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option} sx={{ textAlign: 'center' }}>
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
      axios.delete(process.env.REACT_APP_API_URL+`projects/${row._id}`)
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


    
  function ExportToPDF2(selectedRowData) {
    const doc = new jsPDF();
      doc.addImage(pdfbackground,'JPEG',0,0,doc.internal.pageSize.width, doc.internal.pageSize.height);
      doc.setFontSize(34)
      doc.text("IBM Project Showcase",10,doc.internal.pageSize.height-30)
      doc.setFontSize(15)
      doc.text("Project Workbook",10,doc.internal.pageSize.height-15)
      doc.addPage()

      doc.page = 1

      for (let i = 0; i < selectedRowData.length; i++){
        doc.addImage(projectbackground,'JPEG',0,0,doc.internal.pageSize.width, doc.internal.pageSize.height);
        const startX = 10;
        let startY = 25;
        let imgStartY = 25;
        const lineHeight = 5;
       
  
  
        doc.setLineWidth(0.5);
        doc.setDrawColor(192, 192, 192);
        doc.line(105, 20, 105, doc.internal.pageSize.height - 20, 'S');
        
        
        doc.setFontSize(13)
        const maxTitleWidth = 80;
        const titleLines = doc.setFont(undefined,'bold').splitTextToSize(selectedRowData[i].title, maxTitleWidth);
        let titleLineCount = 0;
        titleLines.forEach(line => {
          doc.text(line, 115, startY + (titleLineCount * lineHeight));
          titleLineCount++;
        });
        startY += lineHeight * titleLineCount;
        startY += 3;

        
        doc.setFontSize(11);
        const maxGroupMembersWidth = 80;
        const groupMembersLines = doc.setFont(undefined,'normal').splitTextToSize(`Group Members: ${selectedRowData[i].groupMembers}`, maxGroupMembersWidth);
        groupMembersLines.forEach(line => {
          doc.text(line, 115, startY);
          startY += lineHeight;
        });
        startY +=3;

        

        const maxDescriptionWidth = 80;
        const maxWidth = 190; // Width of the area where the text should appear
        const descriptionLines = doc.splitTextToSize(`Description: ${selectedRowData[i].description}`, maxDescriptionWidth);
        let lineCount = 0;
        descriptionLines.forEach(line => {
          const lines = doc.splitTextToSize(line, maxWidth);
          lines.forEach((line, index) => {
            doc.text(line, 115, startY + (lineCount * lineHeight) + (index * lineHeight));
          });
          lineCount += lines.length;
        });
        startY += lineHeight * lineCount;

        for (let j = 0; j < 3; j++){
          const imageData = process.env.REACT_APP_API_URL+`images/${selectedRowData[i]._id}/${selectedRowData[i].images[j]}`
          doc.addImage(imageData, 'JPEG', startX,imgStartY, 75, 75);
          imgStartY += lineHeight+75;
        }
        doc.setFontSize(10)
        doc.text(`${doc.page}`,104,10);//print number bottom right
        doc.page ++;
        doc.setFontSize('normal')
        doc.addPage()
      }      
      
      var pageCount = doc.internal.getNumberOfPages();
      doc.deletePage(pageCount)
      doc.save('ProjectWorkbook.pdf');
    
  }
  

        

  return (
    <Container className='projectTable' style={{ height: "567px", maxWidth: "1300px" ,marginBottom:"5rem"}}>
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
            <Grid xs={11}>
                <Button 
                    onClick={() => ExportToPDF2(selectedRowData)}
                    disabled = {selectedRowData.length === 0}
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
        
          setSelectedRowData(selectedRowData)
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

