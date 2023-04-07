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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <AdminHeader />
      </div>
      <div style={{ flex: 1 }}>
        <AboutEditContent />
      </div>
      <Footer />
    </div>
  );
}

export default EditAbout;

function AboutEditContent() {
  const [content, setContent] = useState(''); 

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/about/`)
    .then((response) => {setContent(response.data.content)})
    .catch((error) => {console.log(error)});
  })

  return (
    <section style={{display:'flex',flexDirection:'row',justifyContent: 'space-around'}}>
      <AboutLeft content={content}/>
      <AboutRight content={content}/>
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
      fontSize: '3rem',
      padding:'5rem 0'
    },
    abouttext:{
      fontSize: '1.5rem', 
      lineHeight: '150%',
      textAlign: 'justify',
      whiteSpace: 'pre-wrap',
    },
  };
  return (
    <Box style={styles.styleleft}>
      <Typography variant="h1" style={styles.abouttitle}>Current About Description</Typography>
      <Typography variant="h3" style={styles.abouttext}>
      {props.content}
      </Typography>
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
      fontSize: '3rem',
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
      whiteSpace: 'pre-wrap',
    }
  };
  
  const [newContent, setNewContent] = useState("");
  useEffect(() => {setNewContent(props.content)},[props.content]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/about`, { "content": newContent })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleInputChange = (e) => {
    setNewContent(e.target.value);
  };

  return (
    <Box style={styles.about} >
      <Typography variant="h1" style={styles.abouttitle}>Edit About Description</Typography>
      <Box sx={styles.textFieldWrapper} >
        <TextField label="Edit About Description Here" multiline={true} minRows="15" required fullWidth inputProps={inputProps} value={newContent}
          onChange={handleInputChange}/>
      </Box>
      <div style={styles.aboutbutton}>
        <Button variant="contained" onClick={handleSubmit} type="submit" style={{textTransform: 'none'}}>Update</Button>
        <Link to="/editproject" style={{textDecoration:'none'}}><Button style={{textTransform: 'none'}}variant="outlined">Cancel</Button></Link>
      </div>
    </Box>
  )
}
