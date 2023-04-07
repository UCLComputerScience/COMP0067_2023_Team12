import Header from './Header';
import Footer from './Footer';
import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import emailjs from '@emailjs/browser';

export default function LearningPath(){
	return (
		<div>
			<Header />
			<section style={{display:'flex',flexDirection:'row',justifyContent: 'space-around'}}>
				<Box style={{width:'50%'}}>
					<Typography variant="h1" style={{fontSize: '4rem', padding:'5rem 0'}}>Learning Path</Typography>
					<iframe src="https://prezi.com/p/embed/lEJRPrWc3hLGGhVWIt1m?autoplay=1" frameborder='0' allow='autoplay' style={{width:'100%',aspectRatio: '16/9.5'}} ></iframe>
				</Box>
				<LearnRight />
			</section>
			<Footer />
		</div>
	)
}

const LearnRight = () => {
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
        <Typography variant="h1" style={styles.abouttitle}>Register Interest</Typography>
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