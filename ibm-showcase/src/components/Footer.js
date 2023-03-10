import Box from '@mui/material/Box'; 
import LockIcon from '@mui/icons-material/Lock';
import { Twitter, YouTube, Facebook, LinkedIn } from '@mui/icons-material';
import logo from './ibm_logo.svg';
import ucl_logo from './ucl_logo.svg';
import {Link} from 'react-router-dom';

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
  };

  return (
    <footer style={styles.footer}>
      <Box style={styles.logobox}>
        <img src={logo} style={styles.logo1}/>
        <img src={ucl_logo} style={styles.logo2}/>
      </Box>
      <Box>
        <ul><b>About</b></ul>
        <ul>About Program</ul>
        <ul>About IBM</ul>
        <ul>About UCL</ul>
        <ul>Contact Us</ul>
      </Box>
      <Box>
        <ul><b>Projects</b></ul>
        <ul>Featured Projects</ul>
        <ul>View All Projectss</ul>
        <ul>Search for Projectss</ul>
      </Box>
      <Box>
        <ul><b>Follow us</b></ul>
        <ul>
          <YouTube sx={styles.icon} alt="YouTube" />
          <Twitter sx={styles.icon} alt="Twitter" />
          <Facebook sx={styles.icon} alt="Facebook" />
          <LinkedIn sx={styles.icon} alt="LinkedIn" />
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