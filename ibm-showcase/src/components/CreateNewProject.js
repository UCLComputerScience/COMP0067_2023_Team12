import axios from "axios";
import AdminHeader from './AdminHeader'
import './CreateNewProject.css';
import { Typography, Select, FormControl, MenuItem, InputLabel, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import React, { useState } from 'react';
import UploadImages from './UploadImages'
import { useLocation, useParams } from 'react-router-dom';
import Footer from './Footer'
import {Link} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CreateNewProject() {
  document.body.style = 'background: #F4F7FE;';
  
  return (
    <div className="main-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="header-container" style={{ flex: 1 }}>
        <AdminHeader />
      </div>
      <div className="homebody-container" style={{ flex: 1 }}>
        <ProjectForm />
      </div>
      <Footer />
    </div>
    );
  }

export default CreateNewProject;

function ProjectForm() {

  const [fileArray, setFileArray] = useState("");
  const [singleBannerArray, setSingleBannerArray] = useState("");
  const [titleValue, setTitleValue] = useState('');

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    //Work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    // for multi-selects, we need special handling
    formJson.tags = formJson.tags.split(',');
    formJson.images = fileArray;
    formJson.bannerImage = singleBannerArray;
    console.log(formJson);
    console.log(fileArray);
    console.log(singleBannerArray);
    axios.post('http://localhost:8080/api/projects', formJson)  
    //   .catch(function (error) {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //       // http.ClientRequest in node.js
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log('Error', error.message);
    //     }
    //     console.log(error.config);
    // });
  }

  // console.log(inFillData)

  return (
    <form className='ProjectForm' onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{marginTop:'2rem'}}>Create a New Project</Typography>
      <Forms passData={[setFileArray,setSingleBannerArray]} titlehook={[titleValue, setTitleValue]}/>
    </form>

  )
}

function Forms(props){
  return (
    <div className="Forms">
      <FormLeft titlehook={props.titlehook} />
      <FormRight passData={props.passData} titlehook={props.titlehook} />
    </div>
  )

}
// function Forms(props) {
//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12} md={6}>
//         <FormLeft titlehook={props.titlehook} />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <FormRight passData={props.passData} titlehook={props.titlehook} />
//       </Grid>
//     </Grid>
//   );
// }
function FormLeft(props) {
  const handleInputChange = (event) => {
    props.titlehook[1](event.target.value);
  };

  // console.log(props.fillData.title)
  return (
    <div className="FormLeft" style={{margin:'2rem 0 5rem 0'}}>
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project Title</Typography>
      <TextField name='title' label="Enter Title Here" value={props.titlehook[0]} onChange={handleInputChange}/>
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Group Members</Typography>
      <TextField name='groupMembers' label="Enter Group Members Here" />
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Supervisors</Typography>
      <TextField name='supervisors' label="Enter Supervisors Here" />
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project Description</Typography>
      <TextField name='description' label="Enter Description Here" multiline={true} minRows="5" />
    </div>

  )
}

function FormRight(props) {
  const [openAlert, setOpenAlert] = React.useState(false);

  return (
    <div className="FormRight"  style={{margin:'2rem 0 2rem 0'}}>
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project Video Link</Typography>
      <TextField name='videoLink' label="Enter Youtube Link Here" />
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project Images</Typography>
      <Typography sx={{color:"grey", padding:"0 0 0.5rem 0"}}>Please select ALL images in one go. Change image selections by re-click (overriding).</Typography>
      {/*Only .jpg files. 5MB Max Each.*/}
      <UploadImages passData={props.passData[0]} multi={true} />
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Wide Banner Image</Typography>
      <Typography sx={{color:"grey", padding:"0 0 0.5rem 0"}}>Please select one image suitable for wide banner. Image would be cropped to ultra wide.</Typography>
      <UploadImages passData={props.passData[1]}/>
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project Category</Typography>
      <CategorySelect />
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project #HashTags</Typography>
      <TagSelect />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "3rem" }}>
        {/*<Link to="/editproject" style={{textDecoration:'none'}}><Button variant="outlined" sx={{textTransform: "none", margin: "0 1rem 0 1rem"}} >Cancel</Button></Link>*/}
        {props.titlehook[0] 
          ? <Button variant="outlined" onClick={() => {setOpenAlert(true)}} sx={{textTransform: "none", margin: "0 1rem 0 1rem"}}>Cancel</Button> 
          : <Link to="/editproject" style={{textDecoration:'none'}}><Button variant="outlined" sx={{textTransform: "none", margin: "0 1rem 0 1rem"}} >Cancel</Button></Link>
        }
        <Dialog open={openAlert} onClose={() => {setOpenAlert(false)}}>
          <DialogTitle>Cancel Changes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to cancel? All the filled data will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setOpenAlert(false)}} color="primary">
              No
            </Button>
            <Link to="/editproject" style={{textDecoration:'none'}}>
              <Button color="secondary">
                Yes
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
        <Button variant="contained" type="submit" sx={{textTransform: "none"}} disabled={!props.titlehook[0]}>Submit</Button>
      </div>

    </div>

  )
}

function CategorySelect() {
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Select Project Category</InputLabel>
        <Select
          name='category'
          labelId="simple-select-label"
          id="simple-select"
          value={category}
          label="Select Project Category"
          onChange={handleChange}
        >
          <MenuItem value={"AI"}>AI</MenuItem>
          <MenuItem value={"Asset Management"}>Asset Management</MenuItem>
          <MenuItem value={"Automation"}>Automation</MenuItem>
          <MenuItem value={"Blockchain"}>Blockchain</MenuItem>
          <MenuItem value={"Capstone"}>Capstone</MenuItem>
          <MenuItem value={"Cloud"}>Cloud</MenuItem>
          <MenuItem value={"Data Science"}>Data Science</MenuItem>
          <MenuItem value={"Design Thinking"}>Design Thinking</MenuItem>
          <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
          <MenuItem value={"IT"}>IT</MenuItem>
          <MenuItem value={"Security"}>Security</MenuItem>
          <MenuItem value={"Supply Chain"}>Supply Chain</MenuItem>
          {/* <MenuItem value={'AI'}>AI</MenuItem> */}
          {/* <MenuItem value={'VR'}>VR</MenuItem> */}
          {/* <MenuItem value={'Other'}>Other</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}

function TagSelect() {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const tags = [
    "AI/ML", 
    "Asset Management", 
    "Automation", 
    "Back-End", 
    "Blockchain", 
    "Capstone", 
    "Cloud", 
    "Data Science", 
    "Design Thinking", 
    "FinTech", 
    "Front-End", 
    "Healthcare", 
    "IT", 
    "Security", 
    "Supply Chain", 
    "Sustainability"
  
    // 'Tag A',
    // 'Tag B',
    // 'Tag C',
  ];

  function getStyles(tag, tags_selected, theme) {
    return {
      fontWeight:
        tags_selected.indexOf(tag) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();
  const [tags_selected, setTag] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTag(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
        <FormControl>
          <InputLabel id="multiple-chip-label">Project Tags</InputLabel>
          <Select
            name='tags'
            labelId="multiple-chip-label"
            id="multiple-chip"
            multiple
            value={tags_selected}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Project Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected
                .slice() 
                .sort((a, b) => a.localeCompare(b)) 
                .map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tags.map((tag) => (
              <MenuItem
                key={tag}
                value={tag}
                style={getStyles(tag, tags_selected, theme)}
              >
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    );
}
