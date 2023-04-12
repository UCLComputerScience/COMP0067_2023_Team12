import axios from "axios";
import AdminHeader from './AdminHeader'
import './CreateNewProject.css';
import { Typography, Select, FormControl, MenuItem, InputLabel, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import React, { useState, useEffect } from 'react';
import UploadImages from './UploadImages'
import { useLocation, useParams, Navigate, Link } from 'react-router-dom';
import Footer from './Footer'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Toolbar, Alert } from '@mui/material';

function EditNewProject() {
  document.body.style = 'background: #F4F7FE;';
  return (
    <div  className="main-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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

export default EditNewProject;

function ProjectForm() {

  // search the below in browser to test, 2nd one has images
  // http://localhost:3000/editproject/6411db841af015b18510a9d8
  // http://localhost:3000/editproject/6416dc43cad8fb40da3f85a5

  const [fileArray, setFileArray] = useState("");
  const [singleBannerArray, setSingleBannerArray] = useState("");
  const [keepImagesChecked, setKeepImagesChecked] = useState(true);
  const [keepBannerChecked, setKeepBannerChecked] = useState(true);

  const { id } = useParams();

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

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
    bannerImage:[],
    category: "",
    tags: [],
  });

  const [changePage, setChangePage] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/projects/${id}/popularity/`)
      .then((response) => {
        // console.log(response.data)
        setInFillData({
          id: response.data._id,
          title: response.data.title,
          groupMembers: response.data.groupMembers,
          supervisors: response.data.supervisors,
          description: response.data.description,
          videoLink: response.data.videoLink,
          images: response.data.images,
          bannerImage:response.data.bannerImage,
          category: response.data.category,
          tags: response.data.tags,
        });
        setLoading(false);
        // console.log(inFillData.images)
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
    formJson.images = keepImagesChecked?inFillData.images.concat(fileArray):fileArray;
    formJson.bannerImage = keepBannerChecked?inFillData.bannerImage:singleBannerArray;
  
    const modifiedImages = formJson.images.map(image => {
      const modifiedFilename = image.replace(/\s+/g, "_"); 
      return modifiedFilename;
    });
  
    const modifiedBanner = formJson.bannerImage.map(image => {
      const modifiedFilename = image.replace(/\s+/g, "_"); 
      return modifiedFilename;
    });

    const newForm = {...formJson, images: modifiedImages, bannerImage: modifiedBanner};

    // console.log(fileArray);
    axios.put(`http://localhost:8080/api/projects/${id}`, newForm)
    .then(response => {
      console.log(response.data);
      setSuccess('Successfully edited this project.')
      // setChangePage(true)
    })
    .catch(e => {
      console.log(e);
      setError(e.response.data.message)
    });
  }

  // console.log(inFillData)

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <form className='ProjectForm' onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{marginTop:'2rem'}}>Edit Project</Typography>
      {error && (
      <Alert severity="error" onClose={() => setError(null)}>
        {error}
      </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={() => setSuccess(null)} 
        action={
          <Button color="inherit" size="small" onClick={() => {
            setSuccess(null);
            setChangePage(true)
          }}>
            Continue
          </Button>
        }>
          {success}
        </Alert>
      )}
      <Forms passData={[setFileArray,setSingleBannerArray]} fillData={inFillData} checks={[keepImagesChecked,setKeepImagesChecked,keepBannerChecked, setKeepBannerChecked]}/>
      {changePage && <Navigate to={'/editproject'} /> }
      {/* <div className="SubmitButton">
        <Button variant="contained" type="submit">Submit</Button>
      </div> */}
    
    </form>

  )
}

function Forms(props){
  return (
    <div className="Forms">
      <FormLeft fillData={props.fillData}/>
      <FormRight passData={props.passData} fillData={props.fillData} checks={props.checks} />
    </div>
  )

}

function FormLeft(props) {
  // console.log(props.fillData.title)
  return (
    <div className="FormLeft" style={{margin:'2rem 0 5rem 0'}}>
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project Title</Typography>
      <TextField name='title' label="Enter Title Here" defaultValue={props.fillData.title}/>
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Group Members</Typography>
      <TextField name='groupMembers' label="Enter Group Members Here" defaultValue={props.fillData.groupMembers}/>
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Supervisors</Typography>
      <TextField name='supervisors' label="Enter Supervisors Here" defaultValue={props.fillData.supervisors}/>
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project Description</Typography>
      <TextField name='description' label="Enter Description Here" multiline={true} minRows="5" defaultValue={props.fillData.description}/>
    </div>

  )
}

function FormRight(props) {
  return (
    <div className="FormRight" style={{margin:'2rem 0 5rem 0'}}>
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project Video Link</Typography>
      <TextField name='videoLink' label="Enter Youtube Link Here" defaultValue={props.fillData.videoLink}/>
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project Images</Typography>
      <Typography sx={{color:"grey", padding:"0 0 0.5rem 0"}}>Current uploaded images. Choose to keep or discard.</Typography>
      <div>
        {props.fillData.images.map((img, i) => {
          return (
            <img style={{margin:"0.25rem"}} className="preview" src={`http://localhost:8080/api/images/${props.fillData.id}/${img}`} alt={"image-" + i} key={i} height="100rem" />
          );
        })}
      </div>
      <FormControlLabel control={<Switch defaultChecked onChange={(event) => {props.checks[1](event.target.checked)}} />} label="Keep All Uploaded Project Images" />
      <Typography sx={{color:"grey", padding:"0 0 0.5rem 0"}}>Please select ALL other images in one go. Change image selections by re-click (overriding).</Typography>
      {/*Only .jpg files. 5MB Max Each.*/}
      <UploadImages passData={props.passData[0]} multi={true} />
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Video Banner Image</Typography>
      <Typography sx={{color:"grey", padding:"0 0 0.5rem 0"}}>Current uploaded banner image. Choose to keep or discard.</Typography>
      <div>
        <img style={{margin:"0.25rem"}} className="preview" src={`http://localhost:8080/api/images/${props.fillData.id}/${props.fillData.bannerImage[0]}`} alt={"banner"} height="100rem" />
      </div>
      <FormControlLabel control={<Switch defaultChecked onChange={(event) => {props.checks[3](event.target.checked)}} />} label="Keep Uploaded Banner Images" />
      <Typography sx={{color:"grey", padding:"0 0 0.5rem 0"}}>Please select one image for video banner.</Typography>
      {props.checks[2]? <div style={{fontStyle: "italic"}}>Disable using uploaded banner toggle to upload new banner image.</div>:<UploadImages passData={props.passData[1]}/>} 
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project Category</Typography>
      <CategorySelect fillData={props.fillData} />
      <Typography variant="h6" sx={{padding:'0.5rem 0'}}>Project #HashTags</Typography>
      <TagSelect fillData={props.fillData} />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "3rem" }}>
        <Link to="/editproject" style={{textDecoration:'none'}}><Button variant="outlined" sx={{textTransform: "none", margin: "0 1rem 0 1rem"}} >Cancel</Button></Link>
        <Button variant="contained" type="submit">Submit</Button>
      </div>

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
