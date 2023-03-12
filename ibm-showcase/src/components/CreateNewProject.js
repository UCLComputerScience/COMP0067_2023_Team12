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

function CreateNewProject() {
  document.body.style = 'background: #F4F7FE;';
  return (
    <div className="App">
      <AdminHeader />
      <hr />
      <ProjectForm />
    </div>
  );
}

export default CreateNewProject;

function ProjectForm() {

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    //Work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
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

  return (
    <form className='ProjectForm' onSubmit={handleSubmit}>
      <h1>Create a New Project</h1>
      <Forms />
      <div className="SubmitButton">
        <Button variant="contained" type="submit">Submit</Button>
      </div>
    </form>

  )
}

function Forms(){
  return (
    <div className="Forms">
      <FormLeft />
      <FormRight />
    </div>
  )

}

function FormLeft() {
  return (
    <div className="FormLeft">
      <h3>Project Title</h3>
      <TextField name='title' label="Enter Title Here" />
      <h3>Group Members</h3>
      <TextField label="Enter Group Members Here" />
      <h3>Supervisors</h3>
      <TextField label="Enter Supervisors Here" />
      <h3>Project Description</h3>
      <TextField name='description' label="Enter Description Here" multiline="true" minRows="5" />
    </div>

  )
}

function FormRight() {
  return (
    <div className="FormRight">
      <h3>Project Video Link</h3>
      <TextField label="Enter Youtube Link Here" />
      <h3>Project Images</h3>
      <text style={{color:"grey", padding:"0 0 0.5rem 0"}}>Only .jpg files. 5MB Max Each.</text>
      <Button variant="contained" component="label">
        Add Pics
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <h3>Project Category</h3>
      <CategorySelect />
      <h3>Project #HashTags</h3>
      <TagSelect />

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
          labelId="simple-select-label"
          id="simple-select"
          value={category}
          label="Select Project Category"
          onChange={handleChange}
        >
          <MenuItem value={1}>AI</MenuItem>
          <MenuItem value={2}>VR</MenuItem>
          <MenuItem value={3}>Other</MenuItem>
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
