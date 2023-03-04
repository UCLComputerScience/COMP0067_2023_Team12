import { Box, Button, TextField, Typography } from '@mui/material';
import Header from './Header';
import './About.css';

function About() {
  return (
    <main>
      <Header />
      <AboutContent />
    </main>
  );
}

export default About;

function AboutContent() {
  return (
    <section style={{display:'flex',flexDirection:'row',justifyContent: 'space-around'}}>
      <AboutLeft />
      <AboutRight />
    </section>
  );
}



function AboutLeft() {
  const styles = {
    styleleft:{
      display:'flex',
      flexDirection:'column',
      width:"50%",
      padding:'0 0 0 1rem'
    },
    abouttitle:{
      fontSize: '5rem',
      padding:'5rem 0'
    },
    abouttext:{
      fontSize: '2rem', 
      lineHeight: '150%',
      textAlign: 'justify'
    },
  };
  return (
    <Box style={styles.styleleft}>
      <Typography variant="h1" style={styles.abouttitle}>About</Typography>
      <Typography variant="h3" style={styles.abouttext}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <Typography variant="h3" style={styles.abouttext}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <Typography variant="h3" style={styles.abouttext}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
    </Box>
  )
}

function AboutRight() {
  const styles = {
    styleright:{
      display:'flex',
      flexDirection:'column',
      width:"35%",
      padding:'0 1rem 0 0'
    },
    abouttitle:{
      fontSize: '5rem',
      padding:'5rem 0'
    },
    aboutsubtitle:{
      fontSize: '2.5rem',
      marginBottom:'1rem'
    },
    abouttextfield:{
      marginBottom:'1.5rem'
    },
    aboutbutton:{
      fontSize:'1.5em'
    },
  };
  return (
      <Box style={styles.styleright}>
        <Typography variant="h1" style={styles.abouttitle}>Get Involved</Typography>
        <Typography variant="h3" style={styles.aboutsubtitle}>Name</Typography>
        <TextField label="Enter Your Name Here" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Email</Typography>
        <TextField label="Enter Your Email Here" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Company/Institution</Typography>
        <TextField label="Enter Your Company/Institution Name Here" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Message(Optional)</Typography>
        <TextField label="Input Message Here" multiline="true" minRows="5" style={styles.abouttextfield} />
        <div>
          <Button variant="contained" size="large" style={styles.aboutbutton} >Submit</Button >
        </div>
      </Box>
  )
}




