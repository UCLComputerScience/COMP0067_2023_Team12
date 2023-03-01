import './IndividualProjectPage.css';
import Header from './Header'
import {ThreeProjectTiles} from './HomeBody'
import Box from '@mui/material/Box';
import ProjectPic1 from './Project1.png';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ProjectPic2 from './Project2.jpeg';
import { Twitter, YouTube, Facebook, LinkedIn } from '@mui/icons-material';

function IndividualProjectPage() {
  return (
    <div>
      <Header />
      <ProjectVideoSection />
      <ProjectDetail />
      <SimilarProjects />
    </div>
  );
}

export default IndividualProjectPage;

function ProjectVideoSection() {
  return (
    <Box sx={{position:'relative',minHeight: '40rem',backgroundImage:`url(${ProjectPic1})`, backgroundSize: 'cover'}}>
      <PlayCircleIcon sx={{fontSize: '5rem', color: 'white', position:'absolute', left: '50%', top: '50%', transform:`translate(-50%, -50%)`}}/>
      <div style={{position:'absolute',fontSize: '1.5rem', color: 'white', bottom:'7rem', left: '50%', transform: `translateX(-50%)`}}>Minhaz Hassan / James Rudd Jones / Ziyu Xu / Nozomu Kitamura</div>
      <div style={{position:'absolute',fontSize: '3rem', color: 'white', bottom:'3rem', left: '50%', transform: `translateX(-50%)`}}>UCL Motion Input 3</div>
    </Box>
  );
}

function ProjectDetail() {
  return (
    <section style={{margin:'auto', padding:'0 7rem', maxWidth:'130rem',fontSize:'2rem', lineHeight:'90%', position:'relative'}}>
      <p style={{fontSize:'3rem'}}>UCL Motion Input 3</p>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <p><b>Group Members</b></p>
      <p>Minhaz Hassan, James Rudd Jones, Ziyu Xu, Nozomu Kitamura</p>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <p><b>Supervisors</b></p>
      <p>Dr John McNamara</p>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <ProjectDescription />
    </section>
  );
}

function ProjectDescription() {
  return (
    <div style={{display:'flex', flex:'1'}}>
      <section style={{width:'60%'}}>
        <p><b>Description</b></p>
        <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</text>
        <br/><br/>
        <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</text>
        <br/><br/>
        <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</text>
      </section>
      <section style={{width:'40%',margin:'2rem 0 1rem 1rem'}}>
        <Box sx={{aspectRatio:'16/10', borderRadius:'1rem',backgroundImage:`url(${ProjectPic2})`, backgroundSize: 'cover', backgroundPosition:'center', position:'relative'}} />
        <div style={{fontSize:'1.5rem', padding:'2rem'}}>Share on social media: <Twitter style={{fontSize: '3rem'}}/><YouTube style={{fontSize: '3rem'}} /><Facebook style={{fontSize: '3rem'}} /><LinkedIn style={{fontSize: '3rem'}} /></div>
      </section>
    </div>
  );
}

function SimilarProjects() {
  return (
    <section style={{margin:'auto', padding:'4rem 7rem 8rem 7rem', maxWidth:'130rem',fontSize:'2rem', lineHeight:'90%', position:'relative'}}>
      <p style={{fontSize:'3rem', marginBottom:'2rem', textAlign: 'center'}}>Similar Projects</p>
      <hr style={{margin:'0 0 4rem 0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <ThreeProjectTiles/>
    </section>
  );
}
