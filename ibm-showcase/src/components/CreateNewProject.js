import axios from "axios";
import AdminHeader from './AdminHeader'
import './CreateNewProject.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import React, { useState } from 'react';
import UploadImages from './UploadImages'
import { useLocation, useParams } from 'react-router-dom';
import Footer from './Footer'
import {Link} from 'react-router-dom';

function CreateNewProject() {
  document.body.style = 'background: #F4F7FE;';
  
  return (
    <div className="App">
      <AdminHeader />
      <hr />
      <ProjectForm />
      <Footer />
    </div>
  );
}

export default CreateNewProject;

function ProjectForm() {

  const [fileArray, setFileArray] = useState("");

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
    console.log(formJson);
    console.log(fileArray);
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
    <form className='ProjectForm' style={{marginTop:'2rem'}} onSubmit={handleSubmit}>
      <h1 >Create a New Project</h1>
      <Forms passData={setFileArray}/>
    </form>

  )
}

function Forms(props){
  return (
    <div className="Forms">
      <FormLeft />
      <FormRight passData={props.passData} />
    </div>
  )

}

function FormLeft(props) {
  // console.log(props.fillData.title)
  return (
    <div className="FormLeft" style={{margin:'2rem 0 5rem 0'}}>
      <h3>Project Title</h3>
      <TextField name='title' label="Enter Title Here" />
      <h3>Group Members</h3>
      <TextField name='groupMembers' label="Enter Group Members Here" />
      <h3>Supervisors</h3>
      <TextField name='supervisors' label="Enter Supervisors Here" />
      <h3>Project Description</h3>
      <TextField name='description' label="Enter Description Here" multiline={true} minRows="5" />
    </div>

  )
}

function FormRight(props) {
  return (
    <div className="FormRight"  style={{margin:'2rem 0 5rem 0'}}>
      <h3>Project Video Link</h3>
      <TextField name='videoLink' label="Enter Youtube Link Here" />
      <h3>Project Images</h3>
      <div style={{color:"grey", padding:"0 0 0.5rem 0"}}>Please select ALL images in one go. Change image selections by re-click (overriding).</div>
      {/*Only .jpg files. 5MB Max Each.*/}
      <UploadImages passData={props.passData}/>
      <h3>Video Banner Image</h3>
      <div style={{color:"grey", padding:"0 0 0.5rem 0"}}>Please select one image for video banner.</div> 
      <UploadImages /*passData={props.passData}.*//>
      <h3>Project Category</h3>
      <CategorySelect />
      <h3>Project #HashTags</h3>
      <TagSelect />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "3rem" }}>
        <Button variant="contained" type="submit" sx={{textTransform: "none"}}>Submit</Button>
        <Link to="/editproject" style={{textDecoration:'none'}}><Button variant="outlined" sx={{textTransform: "none"}} >Cancel</Button></Link>
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
          <MenuItem value={'AI'}>AI</MenuItem>
          <MenuItem value={'VR'}>VR</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
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
  'Tag A',
  'Tag B',
  'Tag C',
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
                {selected.map((value) => (
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
