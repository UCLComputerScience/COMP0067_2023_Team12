import "./Footer.css";
import { Box, Grid} from '@mui/material'; 
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
    axios.get(process.env.REACT_APP_API_URL+`projects/level/Main`)
    .then((response) => {setMainProject(response.data)})
    .catch((error) => {console.log(error)});
  })

  const YoutubeUrl = `https://www.youtube.com/ibm`;
  const twitterUrl = `https://twitter.com/IBM`;
  const facebookUrl = `https://www.facebook.com/IBM`;
  const LinkedInUrl = `https://www.linkedin.com/company/ibm/`;

  return (
    <Grid container className="footer">
      <Grid item xs={6} sm={6} md={3}>
        <Box  className="logobox">
          <img src={logo}  className="logo1"/>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Box className="box">
          <ul><Typography variant="h6" sx={{fontWeight: "bold"}}>About</Typography></ul>
          <ul><Typography variant="h6"><Link to="/about" className="link">About Program</Link></Typography></ul>
          <ul><Typography variant="h6"><Link to="https://www.ibm.com/uk-en/about?lnk=fab_uken" className="link">About IBM</Link></Typography></ul>
          <ul><Typography variant="h6"><Link to="/about" className="link">Contact Us</Link></Typography></ul>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Box className="box">
          <ul><Typography variant="h6" sx={{fontWeight: "bold"}}>Projects</Typography></ul>
          <ul><Typography variant="h6"><Link to={`/projects/${mainProject._id}`} className="link">Featured Projects</Link></Typography></ul>
          <ul><Typography variant="h6"><Link to="/projects" className="link">View All Projects</Link></Typography></ul>
          <ul><Typography variant="h6"><Link to="/projects" className="link">Search for Projects</Link></Typography></ul>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Box className="box">
        <ul><Typography variant="h6" sx={{fontWeight: "bold"}}>Follow us</Typography></ul>
          <ul>
            <IconButton href={YoutubeUrl} ><YouTube className="icon" alt="YouTube" /></IconButton>
            <IconButton href={twitterUrl} ><Twitter className="icon" alt="Twitter" /></IconButton>
            <IconButton href={facebookUrl}><Facebook className="icon" alt="Facebook" /></IconButton>
            <IconButton href={LinkedInUrl}><LinkedIn className="icon" alt="LinkedIn" /></IconButton>
          </ul>
          <ul style={{ marginTop: "3.5rem" }} className="management-access"><Typography variant="h6"><Link to="/signin" className="link">
            Management Access
            <LockIcon  className="lockIcon" alt="Lock" /></Link></Typography>
          </ul>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Footer;