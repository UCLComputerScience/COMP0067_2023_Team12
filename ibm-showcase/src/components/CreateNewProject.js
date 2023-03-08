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
    axios.post('http://localhost:8080/api/books', formJson)

  }

  return (
    <form onSubmit={handleSubmit}>
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
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Select Project Category</InputLabel>
        <Select
          id="simple-select"
          // onChange={handleChange}
        >
          <MenuItem value={1}>AI</MenuItem>
          <MenuItem value={2}>VR</MenuItem>
          <MenuItem value={3}>Other</MenuItem>
        </Select>
      </FormControl>
      <h3>Project #HashTags</h3>
      <MS />

    </div>

  )
}

function MS() {
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

  const names = [
    'Tag A',
    'Tag B',
    'Tag C',
    'Tag D'
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl>
      <InputLabel id="demo-multiple-chip-label">Project Tags</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}