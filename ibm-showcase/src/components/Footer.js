
import Box from '@mui/material/Box';
import './HomeBody.css';
import Toolbar from '@mui/material/Toolbar';
import './Footer.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LockOpenIcon from '@mui/icons-material/LockOpen';


function Footer() {
  return (
  <Toolbar style={{mt:"0rem",position:'static',backgroundColor:'#F4F7FE ',justifyContent:'space-between',alignItems:'baseline'}}>
    <Box className='footer-left'>
      <ul><b>About</b></ul>
      <ul>About Program</ul>
      <ul>About IBM</ul>
      <ul>About UCL</ul>
    </Box >
    <Box className='footer-center-left'>
    <ul><b>Projects</b></ul>
      <ul>Featured Projects</ul>
      <ul>View All Projects</ul>
      <ul>Search for Projects</ul>
    </Box >
    <Box className='footer-center-right'>
      <ul><b>Contact</b></ul>
      <ul>Contact Us</ul>
    </Box>
    <Box className='footer-center-right'>
     <ul><b>Follow us</b></ul>
     <ul>
        <YouTubeIcon sx={{ fontSize: 30 }} />
        <TwitterIcon sx={{ fontSize: 30 }}/>
        <FacebookIcon sx={{ fontSize: 30 }}/>
        <LinkedInIcon sx={{ fontSize: 30 }}/></ul>
      <ul  style={{marginTop:"3.5rem"}}>Management Access<LockOpenIcon sx={{ fontSize: 15 }}/></ul>
    </Box>
  </Toolbar>
  );
}
export default Footer;