import axios from "axios";
import AdminHeader from './AdminHeader'
import './CreateNewProject.css';
import React, { useState, useEffect } from 'react';
import Footer from './Footer'
import {Link} from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import './EditAbout.css';

function EditAbout() {
  
  return (
    <div className="EditAbout">
      <div className="EditAboutHeader">
        <AdminHeader />
      </div>
      <div className="EditAboutBody" >
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
    axios.get(process.env.REACT_APP_API_URL+`about`)
    .then((response) => {setContent(response.data.content)})
    .catch((error) => {console.log(error)});
  })

  return (
    <section className="Forms">
      <AboutLeft content={content}/>
      <AboutRight content={content}/>
    </section>
  );
}

function AboutLeft(props) {
  const styles = {
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
    <Box className="FormLeft">
      <Typography variant="h1" style={styles.abouttitle}>Current About Description</Typography>
      <Typography variant="h3" style={styles.abouttext}>
        <ReactMarkdown children= {props.content} />
      </Typography>
    </Box>
  )
}

function AboutRight(props){
  const styles = {
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
      .put(process.env.REACT_APP_API_URL+`about`, { "content": newContent })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleInputChange = (e) => {
    setNewContent(e.target.value);
  };

  return (
    <Box className="FormRight">
      <Typography variant="h1" style={styles.abouttitle}>Edit About Description</Typography>
      <Box sx={styles.textFieldWrapper} >
        <TextField label="Edit About Description Here" multiline={true} minRows="15" required fullWidth inputProps={inputProps} value={newContent}
          onChange={handleInputChange}/>
      </Box>
      <div style={styles.aboutbutton}>
        <Link to="/editproject" style={{textDecoration:'none'}}><Button style={{textTransform: 'none', margin: "0 1rem 0 1rem"}}variant="outlined">Cancel</Button></Link>
        <Button variant="contained" onClick={handleSubmit} type="submit" style={{textTransform: 'none'}}>Update</Button>
      </div>
    </Box>
  )
}
