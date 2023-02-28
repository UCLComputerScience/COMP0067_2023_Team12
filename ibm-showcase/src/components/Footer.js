import LockIcon from '@mui/icons-material/Lock';
import { Box, Grid} from '@mui/material'; 
import { Twitter, YouTube, Facebook, LinkedIn } from '@mui/icons-material';


function Footer() {
  const styles = {
    grid: {
      mt: "0rem",
      position: 'static',
      backgroundColor: '#F4F7FE',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      spacing: 4,
      p: 2
    },
    icon: {
      fontSize: 30
    },
    lockIcon: {
      fontSize: 15
    }
  };

  return (
    <Grid container style={styles.grid}>
      <Grid item xs={6} sm={6} md={3}>
        <Box>
          <ul><b>About</b></ul>
          <ul>About Program</ul>
          <ul>About IBM</ul>
          <ul>About UCL</ul>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Box>
          <ul><b>Projects</b></ul>
          <ul>Featured Projects</ul>
          <ul>View All Projects</ul>
          <ul>Search for Projects</ul>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Box>
          <ul><b>Contact</b></ul>
          <ul>Contact Us</ul>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Box>
          <ul><b>Follow us</b></ul>
          <ul>
            <YouTube sx={styles.icon} alt="YouTube" />
            <Twitter sx={styles.icon} alt="Twitter" />
            <Facebook sx={styles.icon} alt="Facebook" />
            <LinkedIn sx={styles.icon} alt="LinkedIn" />
          </ul>
          <ul style={{ marginTop: "3.5rem" }}>
            Management Access
            <LockIcon sx={styles.lockIcon} alt="Lock" />
          </ul>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Footer;
