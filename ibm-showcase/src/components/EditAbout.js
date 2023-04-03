import axios from "axios";
import AdminHeader from './AdminHeader'
import './CreateNewProject.css';
import React, { useState, useEffect } from 'react';
import Footer from './Footer'
import {Link} from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

function EditAbout() {
  document.body.style = 'background: #F4F7FE;';
  
  return (
    <div>
      <AdminHeader />
      <AboutEditContent />
      <Footer />
    </div>
  );
}

export default EditAbout;

function AboutEditContent() {
  const [description, setDescription] = useState(''); 

  useEffect(() => {
    axios.get(`http://localhost:8080/api/about/`)
    .then((response) => {setDescription(response.data);})
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const updateDescription = (newDescription) => {
    setDescription(newDescription);
  }

  return (
    <section style={{display:'flex',flexDirection:'row',justifyContent: 'space-around'}}>
      <AboutLeft description={description}/>
      <AboutRight description={description} updateDescription={updateDescription}/>
    </section>
  );
}

function AboutLeft(props) {
  const styles = {
    styleleft:{
      display:'flex',
      flexDirection:'column',
      width:"40%",
      padding:'0 0 0 1rem',
      marginBottom:'5rem'
    },
    abouttitle:{
      fontSize: '4rem',
      padding:'5rem 0'
    },
    abouttext:{
      fontSize: '1.5rem', 
      lineHeight: '150%',
      textAlign: 'justify'
    },
  };
  return (
    <Box style={styles.styleleft}>
      <Typography variant="h1" style={styles.abouttitle}>Current About Description</Typography>
      <Typography variant="h3" style={styles.abouttext}>
      {props.description}
      </Typography>
      {/* <Typography variant="h3" style={styles.abouttext}>
      IBM and UCL (University College London) have collaborated on various technology projects over the years. The IBM-UCL partnership has produced several cutting-edge technology projects and research initiatives, which have the potential to drive innovation and impact in various fields.      </Typography>
      <Typography variant="h3" style={styles.abouttext} sx={{fontStyle:'italic',mt:1}}>
          "Collaborating with UCL has allowed us to tap into a diverse pool of talent and expertise, enabling us to push the boundaries of what's possible in the world of technology."  - Professor John McNamara (IBM,UCL)     </Typography>
      <Typography variant="h3" style={styles.abouttext} sx= {{fontStyle:'italic',mt:1}}>
      "Being part of a collaborative project with IBM has allowed me to work on cutting-edge technologies and gain real-world experience" - John Smith, MSc student at UCL
      </Typography>
      <Typography variant="h3" style={styles.abouttext} sx={{mt:1}}>
      See some of the work we've done below:
      </Typography>
      <Typography variant="h3" style={styles.abouttext} sx={{mt:1}}>
      If you would like to see more, click on the link below. If you would like to get involved in any project or have ideas of your own, please fill in the form on the right
      </Typography> */}
    </Box>
  )
}

function AboutRight(props){
  const styles = {
    about:{
      display:'flex',
      flexDirection:'column',
      width:"40%",
      padding:'0 0 0 1rem'
    },
    abouttitle:{
      fontSize: '4rem',
      padding:'5rem 0 5rem 0'
    },
    textFieldWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    aboutbutton:{ 
      display: "flex", 
      justifyContent: "flex-end", 
      margin: "3rem 0 1rem 0",
      
    }
  };
    const inputProps = {
      style: { 
        fontSize: '1.5rem', 
        lineHeight: '150%',
        textAlign: 'justify',
    }
  };
  const [newDescription, setNewDescription] = useState(props.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateDescription(newDescription);
    axios
      .put(`http://localhost:8080/api/about`, { description: newDescription })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleInputChange = (e) => {
    setNewDescription(e.target.value);
  };

  return (
    <Box style={styles.about} >
      <Typography variant="h1" style={styles.abouttitle}>Edit About Description</Typography>
      <Box sx={styles.textFieldWrapper} >
        <TextField label="Edit About Description Here" multiline="true" minRows="15" required fullWidth inputProps={inputProps} value={newDescription}
          onChange={handleInputChange}/>
      </Box>
      <div style={styles.aboutbutton}>
        <Button variant="contained" onClick={handleSubmit} type="submit" style={{textTransform: 'none'}}>Update</Button>
        <Link to="/editproject" style={{textDecoration:'none'}}><Button style={{textTransform: 'none'}}variant="outlined">Cancel</Button></Link>
      </div>
    </Box>
  )
}
