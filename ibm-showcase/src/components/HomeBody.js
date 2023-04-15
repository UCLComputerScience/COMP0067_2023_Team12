import './HomeBody.css';
import ProjectPic1 from './Project1s.png';
import ProjectPic2 from './Project2.jpeg';
import ProjectPic3 from './Project3.png';
import ProjectPic4 from './Project4.jpg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme } from '@mui/material/styles';
import { Typography,Box,Button,Grid } from '@mui/material';
import PagesIcon from '@mui/icons-material/Pages';
import React, { useState, useEffect } from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from "axios";

function HomeBody() {
  const [mainProject, setMainProject] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");

  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_URL+`projects/level/Main`)
    .then((response) => {setMainProject(response.data)})
    .catch((error) => {console.log(error)});

    axios.get(process.env.REACT_APP_API_URL+`projects/level/1`)
    .then((response) => {setFirst(response.data)})
    .catch((error) => {console.log(error)});

    axios.get(process.env.REACT_APP_API_URL+`projects/level/2`)
      .then((response) => {setSecond(response.data)})
      .catch((error) => {console.log(error)});

    axios.get(process.env.REACT_APP_API_URL+`projects/level/3`)
      .then((response) => {setThird(response.data)})
      .catch((error) => {console.log(error)});
      
  }, [])

  const projects = [first, second, third];

  if (!mainProject || !first || !second || !third) {
    return null;
  }

  return (
  <div className="HomeBody">
  <section className="HomeSection">
    <Typography variant="h3" sx={{color:'white', fontSize:{xs: '2rem',sm: '3rem',md: '4rem'}, marginBottom:'1rem', marginTop:0, paddingTop:'3rem'}}><PagesIcon sx={{fontSize:{xs: '2rem',sm: '2.5rem',md: '3rem'}, padding: '0 0.5rem'}}/>Featured Projects</Typography>
    <hr style={{margin:'0 0 3rem 0',  height:'1px', color: '#E6E6E6', backgroundColor: '#E6E6E6', border: 'none'}}/>
    <Box sx={{minHeight: '30.5rem', borderRadius:'1.5rem',backgroundImage:`linear-gradient(90deg, rgba(0,0,0,0.15) 25%, rgba(255,255,255,0) 40%),url(${process.env.REACT_APP_API_URL}images/${mainProject._id}/${mainProject?mainProject.bannerImage[0]:null})`, backgroundSize: 'cover',backgroundPosition:'center', margin:'0 0 4rem 0', position:'relative'}}>
      <Typography sx={{fontSize: {xs: '1.7rem',sm: '2.5rem',md: '3rem'}, color: 'white', padding: '3rem 3rem 1rem 3rem', lineHeight:'90%'}}>{mainProject.title}</Typography>
      <Typography sx={{fontSize:  {xs: '1rem',sm: '1.2rem',md: '1.4rem'}, color: 'white', padding: '0 0 6rem 3rem ', width: '30%', textAlign: 'justify', maxHeight: '50%'}}> 
      {mainProject ? mainProject.description.slice(0,120)+'...':null}
      </Typography>
      <Link to={`/projects/${mainProject._id}`}><Button 
        size="large" variant="contained" endIcon={<ChevronRightIcon />}
        sx={{fontSize:{xs: '0.7rem',sm: '0.85rem',md: '1.15rem'}, textTransform: "none", paddingRight:'1rem', margin:"0 3rem", position:'absolute', bottom:'1.8rem', borderRadius:'1rem', backgroundColor: "#344DF8"}}
      >
      Read More
      </Button></Link>
    </Box>
    <ThreeProjectTiles projects={projects}/>
    <div style={{display:'flex', flexDirection:'row-reverse'}}>
      <Link to="/projects" style={{textDecoration:'none',color:'inherit'}} ><Button size="large" variant="text"
        sx={{textTransform: "none", fontSize:{xs: '1.5rem',sm: '1.8rem',md: '2rem'}, padding:'0 0 0 0.7rem', margin:'1rem 0'}}
      >
        Explore All Projects<ChevronRightIcon sx={{fontSize:{xs: '1.8rem',sm: '2rem',md: '2.2rem'}}}/>
      </Button></Link>
    </div>
  </section>
  </div>
  );
}

export default HomeBody;

function normalizeDescription(description) {
  const maxLength = 200; 
  if (description.length <= maxLength) {
    return description;
  } else {
    const truncated = description.slice(0, maxLength); 
    const lastSpaceIndex = truncated.lastIndexOf(' '); 
    const normalized = truncated.slice(0, lastSpaceIndex) + '...'; 
    return normalized;
  }
}

export function ProjectTile(props){
  const [isShown, setIsShown] = useState(false);

  const normalisedDescription = normalizeDescription(props.description)

  return(
    <Box 
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      sx={{width:'90%', minHeight: '20rem', borderRadius:'1.5rem',backgroundImage:`linear-gradient(0deg, rgba(0,0,0,0.15) 25%, rgba(255,255,255,0) 40%),url(${props.img})`, 
      backgroundSize: 'cover', backgroundPosition:'center', flexGrow: 1, position:'relative',
      '&:hover': {backgroundImage:`linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${props.img})`}}}
    >
      {isShown && (
        <section style={{color:'white', padding: '1.5rem 1.5rem 5rem 1.5rem', textAlign: 'justify', fontSize:'1.4rem'}}> 
        {normalisedDescription}
        {/* Description Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. */}
        </section>)
      }
      
      <Link to={`/projects/${props.id}`}><Button size='large' variant="text" 
      sx={{fontSize:'1.5rem', color: 'white', textTransform: "none", padding:'0.5rem 0.5rem', textAlign:'left', margin:'0.5rem 1rem', lineHeight:'1.21', 
           position:'absolute', bottom:'0', fontWeight:'bold'}}
      >
        <span>{props.title}<ChevronRightIcon sx={{fontSize:'1.8rem', margin:'0 0 -0.4rem 0.5rem', padding:"0"}}/></span>
      </Button></Link>
    </Box>
  );
}

export function ThreeProjectTiles(props){ 

  console.log(props)

  return(
    <section style={{display: 'flex', flexDirection: 'row', columnGap: '2%',margin:"auto"}}>
      <Grid container spacing={2}sx={{width: "120%" , padding: 0}}>
        <Grid item xs={12} sm={12} md={12} lg={4} container justifyContent="center">
          <ProjectTile img={`${process.env.REACT_APP_API_URL}images/${props.projects[0]._id}/${props.projects[0].images[0]}`} title={props.projects[0].title} description={props.projects[0].description} id={props.projects[0]._id}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} container justifyContent="center">
          <ProjectTile img={`${process.env.REACT_APP_API_URL}images/${props.projects[1]._id}/${props.projects[1].images[0]}`} title={props.projects[1].title} description={props.projects[1].description} id={props.projects[1]._id}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} container justifyContent="center">
          <ProjectTile img={`${process.env.REACT_APP_API_URL}images/${props.projects[2]._id}/${props.projects[2].images[0]}`} title={props.projects[2].title} description={props.projects[2].description} id={props.projects[2]._id}/>
        </Grid>
      </Grid>
    </section>
  );
}
