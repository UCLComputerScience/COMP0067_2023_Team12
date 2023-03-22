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
import React, { useState, useEffect } from 'react';
import UploadImages from './UploadImages'
import { useLocation, useParams, Navigate } from 'react-router-dom';

function EditNewProject() {
  document.body.style = 'background: #F4F7FE;';
  return (
    <div className="App">
      <AdminHeader />
      <hr />
      <ProjectForm />
    </div>
  );
}

export default EditNewProject;

function ProjectForm() {

  // search the below in browser to test, 2nd one has images
  // http://localhost:3000/editproject/6411db841af015b18510a9d8
  // http://localhost:3000/editproject/6416dc43cad8fb40da3f85a5

  const [fileArray, setFileArray] = useState("");

  const { id } = useParams();

  // const [images, setImages] = useState('');
  // const [category, setCategory] = useState('');
  // const [tags, setTags] = useState('');

  const [loading, setLoading] = useState(true);
  const [inFillData, setInFillData] = useState({
    title: "",
    groupMembers: "",
    supervisors: "",
    description: "",
    videoLink: "",
    images: [],
    category: "",
    tags: [],
  });

  const [changePage, setChangePage] = useState(false);

  useEffect(() => {
    // this extracts data altough will also increase popularity count, should we change this?
    axios.get(`http://localhost:8080/api/projects/${id}/popularity/`)
      .then((response) => {
        // console.log(response.data)
        setInFillData({
          title: response.data.title,
          groupMembers: response.data.groupMembers,
          supervisors: response.data.supervisors,
          description: response.data.description,
          videoLink: response.data.videoLink,
          images: response.data.images,
          category: response.data.category,
          tags: response.data.tags,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  

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
    axios.put(`http://localhost:8080/api/projects/${id}`, formJson)
    .then(response => {
      console.log(response.data);
      alert('Successfully edited this project')
      setChangePage(true)
    })
    .catch(e => {
      console.log(e);
      alert(e.response.data.message)
    });
  }

  // console.log(inFillData)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form className='ProjectForm' onSubmit={handleSubmit}>
      <h1>Edit Project</h1>
      <Forms passData={setFileArray} fillData={inFillData}/>
      {changePage && <Navigate to={'/editproject'} /> }
      <div className="SubmitButton">
        <Button variant="contained" type="submit">Submit</Button>
      </div>
    
    </form>

  )
}

function Forms(props){
  return (
    <div className="Forms">
      <FormLeft fillData={props.fillData}/>
      <FormRight passData={props.passData} fillData={props.fillData} />
    </div>
  )

}

function FormLeft(props) {
  // console.log(props.fillData.title)
  return (
    <div className="FormLeft">
      <h3>Project Title</h3>
      <TextField name='title' label="Enter Title Here" defaultValue={props.fillData.title}/>
      <h3>Group Members</h3>
      <TextField name='groupMembers' label="Enter Group Members Here" defaultValue={props.fillData.groupMembers}/>
      <h3>Supervisors</h3>
      <TextField name='supervisors' label="Enter Supervisors Here" defaultValue={props.fillData.supervisors}/>
      <h3>Project Description</h3>
      <TextField name='description' label="Enter Description Here" multiline="true" minRows="5" defaultValue={props.fillData.description}/>
    </div>

  )
}

function FormRight(props) {
  return (
    <div className="FormRight">
      <h3>Project Video Link</h3>
      <TextField name='videoLink' label="Enter Youtube Link Here" defaultValue={props.fillData.videoLink}/>
      <h3>Project Images</h3>
      <div style={{color:"grey", padding:"0 0 0.5rem 0"}}>Please select ALL images in one go. Change image selections by re-click (overriding).</div>
      {/*Only .jpg files. 5MB Max Each.*/}
      <UploadImages passData={props.passData} />
      <h3>Project Category</h3>
      <CategorySelect fillData={props.fillData} />
      <h3>Project #HashTags</h3>
      <TagSelect fillData={props.fillData} />

    </div>

  )
}

function CategorySelect(props) {
  const [category, setCategory] = useState('');
  const [hasCategoryBeenSet, setHasCategoryBeenSet] = useState(false);

  useEffect(() => {
    if (!hasCategoryBeenSet) {
      setCategory(props.fillData.category);
      setHasCategoryBeenSet(true);
    }
  }, [props.fillData.category, hasCategoryBeenSet]);

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

function TagSelect(props) {
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

  const [haveTagsBeenSet, setHaveTagsBeenSet] = useState(false);
  useEffect(() => {
    if (!haveTagsBeenSet) {
      setTag(props.fillData.tags);
      setHaveTagsBeenSet(true);
    }
  }, [props.fillData.tags, haveTagsBeenSet]);

  // useEffect(() => { setTag(props.fillData.tags) })

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
