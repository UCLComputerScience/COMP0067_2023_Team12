import Box from '@mui/material/Box'; 
import { Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Twitter, YouTube, Facebook, LinkedIn } from '@mui/icons-material';
import logo from './Skunk_works_Logo.svg.png';
import {Link} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import React, { useState, useEffect } from 'react';
import axios from "axios";

function Footer() {
  const [mainProject, setMainProject] = useState("");
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/projects/level/Main`)
    .then((response) => {setMainProject(response.data)})
    .catch((error) => {console.log(error)});
  })
  const styles = {
    footer: {
      backgroundColor: '#F4F4F4',
      display:'flex',
      justifyContent: 'space-around',
      padding: '3rem',
      fontSize:'1.2rem'
    },
    logobox:{
      display:'flex',
      flexDirection:'column',
      alignItems: 'center',
      padding:'1.5rem 0rem',
      width:'8%'
    },
    logo1:{
      width: '70%',
      padding: '1rem 0'
    },
    logo2:{
      width: '100%',
      padding: '1rem 0'
    },
    icon: {
      fontSize: 30
    },
    lockIcon: {
      fontSize: 15
    },
    link:{
          textDecoration:'none',
          color:'inherit',
        },
    title:{
      fontWeight:  "bold",
    }
  };
  const YoutubeUrl = ``;
  const twitterUrl = ``;
  const facebookUrl = ``;
  const LinkedInUrl = ``;

  return (
    <footer style={styles.footer}>
      <Box style={styles.logobox}>
        <img src={logo} style={styles.logo1}/>
      </Box>
      <Box>
        <ul><Typography variant="h6" style={styles.title}>About</Typography></ul>
        <ul><Typography variant="h6"><Link to="/about" style={styles.link}>About Program</Link></Typography></ul>
        <ul><Typography variant="h6"><Link to="https://www.ibm.com/uk-en/about?lnk=fab_uken" style={styles.link}>About IBM</Link></Typography></ul>
        <ul><Typography variant="h6"><Link to="/about" style={styles.link}>Contact Us</Link></Typography></ul>
      </Box>
      <Box>
        <ul><Typography variant="h6" style={styles.title}>Projects</Typography></ul>
        <ul><Typography variant="h6"><Link to={`/projects/${mainProject._id}`} style={styles.link}>Featured Projects</Link></Typography></ul>
        <ul><Typography variant="h6"><Link to="/projects" style={styles.link}>View All Projects</Link></Typography></ul>
        <ul><Typography variant="h6"><Link to="/projects" style={styles.link}>Search for Projects</Link></Typography></ul>
      </Box>
      <Box>
      <ul><Typography variant="h6" style={styles.title}>Follow us</Typography></ul>
        <ul>
          <IconButton href={YoutubeUrl} ><YouTube sx={styles.icon} alt="YouTube" /></IconButton>
          <IconButton href={twitterUrl} ><Twitter sx={styles.icon} alt="Twitter" /></IconButton>
          <IconButton href={facebookUrl}><Facebook sx={styles.icon} alt="Facebook" /></IconButton>
          <IconButton href={LinkedInUrl}><LinkedIn sx={styles.icon} alt="LinkedIn" /></IconButton>
        </ul>
        <ul style={{ marginTop: "3.5rem" }}><Typography variant="h6"><Link to="/signin" style={{textDecoration:'none',color:'inherit'}}>
          Management Access
          <LockIcon sx={styles.lockIcon} alt="Lock" /></Link></Typography>
        </ul>
      </Box>
    </footer>
  );
}

export default Footer;