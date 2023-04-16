import axios from "axios";
import { Box, Button, TextField, Typography } from '@mui/material';
import './About.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ReactMarkdown from 'react-markdown';


function About() {
  
  return (
    <div className="About" >
    <div className="AboutBody ">
      <Header />
      <AboutContent />
    </div> 
      <Footer />
    </div>
  );
}

export default About;

/* <div className="main-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="header-container" style={{ flex: 1 }}>
        <AdminHeader />
      </div>
      <div className="homebody-container" style={{ flex: 1 }}>
        <ProjectForm />
      </div>
      <Footer />
    </div> */

function AboutContent() {
  const [description, setDescription] = useState(''); 

  axios.get(process.env.REACT_APP_API_URL+`about/`)
    .then((response) => {setDescription(response.data.content)})
    .catch((error) => {console.log(error)});
  

  return (
    <section className="Forms" >
      <AboutLeft description={description}/>
      <AboutRight />
    </section>
  );
}



function AboutLeft(props) {
  const styles = {
    abouttitle:{
      fontSize: '3.5rem',
      padding:'5rem 0'
    },
    abouttext:{
      fontSize: '1.3rem', 
      lineHeight: '150%',
      textAlign: 'justify',
      whiteSpace: 'pre-wrap',
    },
  };
  return (
    <Box className="FormLeft" >
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
        <ReactMarkdown children={props.description} />
      </Typography>
    </Box>
  )
}



const AboutRight = () => {

  const [showAlert,setShowAlert] = useState(false);

  const form = useRef();

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
      padding:'5rem 0'
    },
    aboutsubtitle:{
      fontSize: '1.5rem',
      marginBottom:'1rem'
    },
    abouttextfield:{
      marginBottom:'1.5rem'
    },
    aboutbutton:{
      fontSize:'1em',
      textTransform: "none",
      marginBottom:'1.5rem'
    },
  };
  return (
      <form ref = {form} onSubmit = {sendEmail} className="FormRight" >

        <Typography variant="h1" style={styles.abouttitle}>Get Involved</Typography>
        <Typography variant="h3" style={styles.aboutsubtitle}>Name</Typography>
        <TextField label="Enter Your Name Here" name="from_name" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Email</Typography>
        <TextField label="Enter Your Email Here"  name = "user_email" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Company/Institution</Typography>
        <TextField label="Enter Your Company/Institution Name Here" name = "company" required style={styles.abouttextfield}/>
        <Typography variant="h3" style={styles.aboutsubtitle}>Message(Optional)</Typography>
        <TextField label="Input Message Here" multiline={true} name="message" minRows="5" style={styles.abouttextfield} />
        <div>
          <Button type = "submit" value = "Send" variant="contained" size="medium" style={styles.aboutbutton} >Submit</Button >
        </div>
        {showAlert && ( // render the success alert if the state variable is true
        <Stack sx={{ width: '100%',postion: 'fixed',top:0,left:0 }} spacing={2}>
          <Alert onClose={() => setShowAlert(false)}>Email was sent successfully!</Alert>
        </Stack>
      )}
      </form>
  )
}




