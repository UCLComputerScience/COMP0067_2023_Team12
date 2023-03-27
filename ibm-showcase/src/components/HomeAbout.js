import './HomeBody.css';
import { Box, Button } from '@mui/material'; 
import AboutBG from './IBM_About.jpg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Link} from 'react-router-dom';

function HomeAbout() {
  return (
  <Box sx={{position:'relative',minHeight: '20rem',backgroundImage:`url(${AboutBG})`, backgroundSize: 'cover',margin: '0 0 -2rem 0'}}>
    <section style={{margin:'auto', padding:'0 7rem', maxWidth:'110rem'}}>
      <div style={{fontSize: '2rem', padding: '3rem 0 0rem 0.25rem', lineHeight:'90%'}}>About</div>
      <p style={{fontSize: '1.4rem', padding: '0 0 6rem 0.25rem ', width: '50%', textAlign: 'justify', maxHeight: '50%'}}>IBM and UCL have collaborated on various projects over the years. From Artificial Intelligence to Quantum Computing - pushing the boundaries of innovation. Learn more about our story.</p>
      <Link to="/about" ><Button 
        size="large" variant="outlined"
        sx={{textTransform: "none",paddingRight:'0.7rem', margin:"0 0.25rem", position:'absolute ', bottom:'1.8rem', borderRadius:'1rem'}}
      >
      Read More<ChevronRightIcon sx={{margin:'0 0 0 0.5rem', padding:"0"}}/>
      </Button></Link>
    </section>
  </Box>
      );
}
    
export default HomeAbout;
