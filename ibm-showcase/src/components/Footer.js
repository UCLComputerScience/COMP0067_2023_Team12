import Box from '@mui/material/Box'; 
import LockIcon from '@mui/icons-material/Lock';
import { Twitter, YouTube, Facebook, LinkedIn } from '@mui/icons-material';
import logo from './ibm_logo.svg';
import ucl_logo from './ucl_logo.svg';
import {Link} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

function Footer() {
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
  };
  const YoutubeUrl = ``;
  const twitterUrl = ``;
  const facebookUrl = ``;
  const LinkedInUrl = ``;

  return (
    <footer style={styles.footer}>
      <Box style={styles.logobox}>
        {/* TO DO change logo from IBM to new logo */}
        <img src={logo} style={styles.logo1}/>
        {/* <img src={ucl_logo} style={styles.logo2}/> */}
      </Box>
      <Box>
        <ul><b>About</b></ul>
        <ul><Link to="/about" style={styles.link}>About Program</Link></ul>
        <ul><Link to="https://www.ibm.com/uk-en/about?lnk=fab_uken" style={styles.link}>About IBM</Link></ul>
        <ul><Link to="/about" style={styles.link}>Contact Us</Link></ul>
      </Box>
      <Box>
        <ul><b>Projects</b></ul>
        <ul><Link to="/projects/:id" style={styles.link}>Featured Projects</Link></ul>
        <ul><Link to="/about" style={styles.link}>View All Projects</Link></ul>
        <ul><Link to="/about" style={styles.link}>Search for Projects</Link></ul>
      </Box>
      <Box>
        <ul><b>Follow us</b></ul>
        <ul>
          <IconButton href={YoutubeUrl} ><YouTube sx={styles.icon} alt="YouTube" /></IconButton>
          <IconButton href={twitterUrl} ><Twitter sx={styles.icon} alt="Twitter" /></IconButton>
          <IconButton href={facebookUrl}><Facebook sx={styles.icon} alt="Facebook" /></IconButton>
          <IconButton href={LinkedInUrl}><LinkedIn sx={styles.icon} alt="LinkedIn" /></IconButton>
        </ul>
        <ul style={{ marginTop: "3.5rem" }}><Link to="/signin" style={{textDecoration:'none',color:'inherit'}}>
          Management Access
          <LockIcon sx={styles.lockIcon} alt="Lock" /></Link>
        </ul>
      </Box>
    </footer>
  );
}

export default Footer;