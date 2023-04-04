import axios from "axios";
import { Box, Button, TextField, Typography } from '@mui/material';
import Header from './Header';
import './About.css';
import Footer from './Footer'
import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

function About() {
  return (
    <main className='About'>
      <Header />
      <AboutContent />
      <Footer />
    </main>
  );
}

export default About;

function AboutContent() {
  const [description, setDescription] = useState(''); 

  useEffect(() => {
    axios.get(`http://localhost:8080/api/about/`)
    .then((response) => {setDescription(response.data[0].data);})
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <section style={{display:'flex',flexDirection:'row',justifyContent: 'space-around'}}>
      <AboutLeft description={description}/>
      <AboutRight />
    </section>
  );
}



function AboutLeft(props) {
  const styles = {
    styleleft:{
      display:'flex',
      flexDirection:'column',
      width:"50%",
      padding:'0 0 0 1rem'
    },
    abouttitle:{
      fontSize: '4rem',
      padding:'5rem 0'
    },
    abouttext:{
      fontSize: '1.5rem', 
      lineHeight: '150%',
      textAlign: 'justify',
      whiteSpace: 'pre-wrap',
    },
  };
  return (
    <Box style={styles.styleleft}>
      <Typography variant="h1" style={styles.abouttitle}>About</Typography>
      {/* <Typography variant="h3" style={styles.abouttext}>
      IBM and UCL (University College London) have collaborated on various technology projects over the years. The IBM-UCL partnership has produced several cutting-edge technology projects and research initiatives, which have the potential to drive innovation and impact in various fields.      </Typography>
      <Typography variant="h3" style={styles.abouttext} sx={{fontStyle:'italic',mt:1}}>
          "Collaborating with UCL has allowed us to tap into a diverse pool of talent and expertise, enabling us to push the boundaries of what's possible in the world of technology."  - Professor John McNamara (IBM,UCL)     </Typography>
      <Typography variant="h3" style={styles.abouttext} sx= {{fontStyle:'italic',mt:1}}>
      "Being part of a collaborative project with IBM has allowed me to work on cutting-edge technologies and gain real-world experience" - John Smith, MSc student at UCL
      </Typography>
      <Typography variant="h3" style={styles.abouttext} sx={{mt:1}}>
      See some of the work we've done below:
      </Typography>
      <Typography variant="h3" style={styles.abouttext} sx={{mt:1}}>
      If you would like to see more, click on the link below. If you would like to get involved in any project or have ideas of your own, please fill in the form on the right
      </Typography> */}
      <Typography variant="h3" style={styles.abouttext}>
        {props.description}
      </Typography>
    </Box>
  )
}

const AboutRight = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ol9tk59', 'template_1yi3sht', form.current, '-hNSwpJVlH9i86VIs')
      .then((result) => {
          console.log(result.text);
          console.log("message sent")
      }, (error) => {
          console.log(error.text);
      });
  };

  const styles = {
    styleright:{
      display:'flex',
      flexDirection:'column',
      width:"35%",
      padding:'0 1rem 0 0'
    },
    abouttitle:{
      fontSize: '4rem',
      padding:'5rem 0'
    },
    aboutsubtitle:{
      fontSize: '2rem',
      marginBottom:'1rem'
    },
    abouttextfield:{
      marginBottom:'1.5rem'
    },
    aboutbutton:{
      fontSize:'1.5em',
      textTransform: "none",
      marginBottom:'1.5rem'
    },
  };
  return (
      <form ref = {form} onSubmit = {sendEmail} style={styles.styleright}>
        <Typography variant="h1" style={styles.abouttitle}>Get Involved</Typography>
        <Typography variant="h3" style={styles.aboutsubtitle}>Name</Typography>
        <TextField label="Enter Your Name Here" name="from_name" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Email</Typography>
        <TextField label="Enter Your Email Here"  name = "user_email" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Company/Institution</Typography>
        <TextField label="Enter Your Company/Institution Name Here" name = "company" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Message(Optional)</Typography>
        <TextField label="Input Message Here" multiline="true" name="message" minRows="5" style={styles.abouttextfield} />
        <div>
          <Button type = "submit" value = "Send" variant="contained" size="medium" style={styles.aboutbutton} >Submit</Button >
        </div>
      </form>
  )
}




