// The fucntion sendEmail is adapated from https://www.youtube.com/watch?v=bMq2riFCF90
// React-related imports
import React, { useState, useRef } from 'react';
// Third-party library imports
import emailjs from '@emailjs/browser';
// UI component imports
import { Box, Button, TextField, Typography, Stack  } from '@mui/material';
import Alert from '@mui/material/Alert';
// Local component imports
import Header from '../components/Header';
import Footer from '../components/Footer';
// Style imports
import './LearningPath.css';

export default function LearningPath(){
	return (
		<div className="Learning" >
    <div className="LearningBody">
			<Header />
      <Alert severity="success" icon={false} style={{margin:'2rem 10% 0 10%', fontSize:'1rem'}}>
      Are you a student looking to be part of the programme? Complete the Learning Path below and Register your Interest!
      </Alert>

			<section className="Forms">
				<Box className="FormLeft" >
					<Typography variant="h1" sx={{fontSize: '3.5rem', padding:'2rem 0'}}>Learning Path</Typography>
					<iframe title='Prezi_LearningPath' src="https://prezi.com/p/embed/lEJRPrWc3hLGGhVWIt1m?autoplay=1" frameborder='0' allow='autoplay' style={{width:'100%',aspectRatio: '16/9.5'}} ></iframe>
				</Box>
				<LearnRight />
			</section>
      </div>
			<Footer />
		</div>
	)
}

const LearnRight = () => {
  const form = useRef();

  const [showAlert, setShowAlert] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ol9tk59', 'template_1yi3sht', form.current, '-hNSwpJVlH9i86VIs')
      .then((result) => {
          console.log(result.text);
          console.log("message sent")
          form.current.reset();
          setShowAlert(true);
      }, (error) => {
          console.log(error.text);
      });
  };

  const styles = {
    abouttitle:{
      fontSize: '3.5rem',
      padding:'2rem 0'
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
      <form ref = {form} onSubmit = {sendEmail} style={styles.styleright} className="FormRight" >
        <Typography variant="h1" style={styles.abouttitle}>Register Interest</Typography>
        <Typography variant="h3" style={styles.aboutsubtitle}>Name</Typography>
        <TextField label="Enter Your Name Here" name="from_name" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Email</Typography>
        <TextField label="Enter Your Email Here"  name = "user_email" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>University/Institution</Typography>
        <TextField label="Enter Your Company/Institution Name Here" name = "company" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Message(Optional)</Typography>
        <TextField label="Input Message Here" multiline="true" name="message" minRows="5" style={styles.abouttextfield} />
        <div>
          <Button type = "submit" value = "Send" variant="contained" size="medium" style={styles.aboutbutton} >Submit</Button >
        </div>
        {showAlert && (// render the success alert if the state variable is true
          <Stack sx={{ width: '100%', marginTop: '1rem' }} spacing={2}>
            <Alert onClose={() => setShowAlert(false)} severity="success">
              Email was sent successfully!
            </Alert>
          </Stack>
        )}
      </form>
  )
}