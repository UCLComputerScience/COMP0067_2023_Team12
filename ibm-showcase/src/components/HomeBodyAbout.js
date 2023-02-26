import './HomeBody.css';
import Box from '@mui/material/Box';
import AboutBG from './IBM_About.jpg';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function HomeBodyAbout() {
  return (
  <div style={{margin:'auto', position:'relative', maxWidth:'130rem'}}>
    <Box sx={{minHeight: '20rem',backgroundImage:`url(${AboutBG})`, backgroundSize: 'cover'}}>
      <div style={{fontSize: '2rem', padding: '3rem 0 0rem 10rem', lineHeight:'90%'}}>About</div>
      <p style={{fontSize: '1.4rem', padding: '0 0 6rem 10rem ', width: '50%', textAlign: 'justify', maxHeight: '50%'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <Button 
        size="large" variant="contained"
        sx={{textTransform: "none",paddingRight:'0.7rem', margin:"0 10rem", position:'absolute ', bottom:'1.8rem', borderRadius:'1rem', backgroundColor: "#344DF8"}}
      >
      Read More<ChevronRightIcon sx={{margin:'0 0 0 0.5rem', padding:"0"}}/>
    </Button>
    </Box>
  </div>

      );
}
    
export default HomeBodyAbout;