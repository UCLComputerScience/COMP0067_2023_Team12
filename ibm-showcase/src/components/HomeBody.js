import './HomeBody.css';
import Box from '@mui/material/Box';
import ProjectPic1 from './Project1s.png';
import ProjectPic2 from './Project2.jpeg';
import ProjectPic3 from './Project3.png';
import ProjectPic4 from './Project4.jpg';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme } from '@mui/material/styles';
import PagesIcon from '@mui/icons-material/Pages';
import React, { useState } from 'react';

function HomeBody() {
  return (
  <section className="HomeBody" style={{margin:'auto', padding:'0 7rem', maxWidth:'110rem'}}>
    <h1 style={{color:'white', fontSize:'4rem', marginBottom:'1rem'}}><PagesIcon sx={{fontSize:'3rem', padding: '0 0.5rem'}}/>Featured Projects</h1>
    <hr style={{margin:'0 0 3rem 0',  height:'1px', color: '#E6E6E6', backgroundColor: '#E6E6E6', border: 'none'}}/>
    <Box sx={{minHeight: '30.5rem', borderRadius:'1.5rem',backgroundImage:`linear-gradient(90deg, rgba(0,0,0,0.15) 25%, rgba(255,255,255,0) 40%),url(${ProjectPic1})`, backgroundSize: 'cover',backgroundPosition:'center', margin:'0 0 4rem 0', position:'relative'}}>
      <div style={{fontSize: '3rem', color: 'white', padding: '3rem 3rem 1rem 3rem', lineHeight:'90%'}}>UCL Motion Input 3</div>
      <p style={{fontSize: '1.4rem', color: 'white', padding: '0 0 6rem 3rem ', width: '30%', textAlign: 'justify', maxHeight: '50%'}}> 
      Motioninput is a pioneering touchless computing technology devleoped by UCL Computer Science students
      </p>
      <Button 
        size="large" variant="contained" endIcon={<ChevronRightIcon />}
        sx={{fontSize:'1.15rem', textTransform: "none", paddingRight:'1rem', margin:"0 3rem", position:'absolute', bottom:'1.8rem', borderRadius:'1rem', backgroundColor: "#344DF8"}}
      >
      Read More
      </Button>
    </Box>
    <ThreeProjectTiles />
    <div style={{display:'flex', flexDirection:'row-reverse'}}>
      <Button size="large" variant="text"
        sx={{textTransform: "none", fontSize:'2rem', padding:'0 0 0 0.7rem', margin:'1rem 0'}}
      >
        Explore All Projects<ChevronRightIcon sx={{fontSize:'2.2rem'}}/>
      </Button>
    </div>
  </section>
  );
}

export default HomeBody;

export function ProjectTile(props){
  const [isShown, setIsShown] = useState(false);

  return(
    <Box 
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      sx={{width:'30%', minHeight: '20rem', borderRadius:'1.5rem',backgroundImage:`linear-gradient(0deg, rgba(0,0,0,0.15) 25%, rgba(255,255,255,0) 40%),url(${props.img})`, 
      backgroundSize: 'cover', backgroundPosition:'center', flexGrow: 1, position:'relative',
      '&:hover': {backgroundImage:`linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${props.img})`}}}
    >
      {isShown && (
        <section style={{color:'white', padding: '1.5rem 1.5rem 5rem 1.5rem', textAlign: 'justify', fontSize:'1.5rem'}}> 
        Description Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </section>)
      }

      <Button size='large' variant="text" 
      sx={{fontSize: '2.2rem', color: 'white', textTransform: "none", padding:'0.5rem 0.5rem', textAlign:'left', margin:'0.5rem 1rem', lineHeight:'1.21', 
           position:'absolute', bottom:'0', fontWeight:'bold'}}
      >
        <span>{props.title}<ChevronRightIcon sx={{fontSize:'2.2rem', margin:'0 0 -0.4rem 0.5rem', padding:"0"}}/></span>
      </Button>
    </Box>
  );
}

export function ThreeProjectTiles(){
  return(
    <section style={{display: 'flex', flexDirection: 'row', columnGap: '2%'}}>
      <ProjectTile img={ProjectPic2} title='Franklin Immersive Social Engagement (FISE)'/>
      <ProjectTile img={ProjectPic3} title='IBM Watson Project'/>
      <ProjectTile img={ProjectPic4} title='HMI: Haptic Icons Design'/>
    </section>
  );
}