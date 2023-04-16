import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './IndividualProjectPage.css';
import Header from './Header'
import {ProjectTile} from './HomeBody'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Twitter, Facebook, LinkedIn, Print } from '@mui/icons-material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {useParams} from 'react-router-dom'
import axios from "axios";
import Footer from './Footer';
import { Typography,Box,IconButton,Grid} from '@mui/material';

function IndividualProjectPage() {
  const {id} = useParams();
  const [project, setProject] = useState("");
  const [shouldRenderSimilarProjects, setShouldRenderSimilarProjects] = useState(false);
  const [isUseEffectCompleted, setIsUseEffectCompleted] = useState(false);
  useEffect(() => {
    axios
    .get(process.env.REACT_APP_API_URL+`projects/${id}`)
    .then(response => {
        console.log(response.data);
        setProject(response.data);
        setShouldRenderSimilarProjects(true);
        window.scrollTo(0, 0);
        setIsUseEffectCompleted(true);
    });
  },[id]);

  if (!isUseEffectCompleted) {
    return null;
  }

  return (
    <div className="IndividualProjectPage">
      <div className="IndividualBody">
        <Header />
        <ProjectVideoSection project={project}/>
        <ProjectDetail project={project}/>
        {shouldRenderSimilarProjects && <SimilarProjects project={project}/>}
      </div>
        <Footer />
    </div>
  );
}

export default IndividualProjectPage;


function ProjectVideoSection(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  const handleOnClose = () => {
    setIsPlaying(false);
  };
  return (
    <Box sx={{position:'relative',minHeight: '40rem',backgroundImage:`url(${process.env.REACT_APP_API_URL}images/${props.project._id}/${props.project?props.project.bannerImage[0]:null})`,
     backgroundSize: 'cover', display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
      {isPlaying ? (
        <div style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}>
          <ReactPlayer
            url={props.project.videoLink}
            playing={true}
            controls={true}
            width='100%'
            height='100%'
            onEnded={handleOnClose}
          />
        </div>
      ) : (
        <div>
          <PlayCircleIcon sx={{fontSize: '5rem', color: 'lightgray',cursor: 'pointer'}} onClick={handlePlayClick}/>
        </div>
      )}
      
      
      
    </Box>

  );
}

function ProjectDetail(props) {
  return (
    <section className="projectDetailSection">
      <Typography variant="body1" sx={{fontSize:{xs: '1rem',sm: '1.5rem',md: '2rem'},padding:'2rem 0' }}>{props.project.title}</Typography>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <Typography variant="body1" sx={{fontSize:{xs: '1rem',sm: '1.2rem',md: '1.5rem'},padding:'1rem 0',fontWeight:  "bold" }}>Group Members</Typography>
      <Typography variant="body1" sx={{fontSize:{xs: '1rem',sm: '1.2rem',md: '1.5rem'},padding:'1rem 0',}}>{props.project.groupMembers}</Typography>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <Typography variant="body1"sx={{fontSize:{xs: '1rem',sm: '1.2rem',md: '1.5rem'},padding:'1rem 0',fontWeight:  "bold" }}>Supervisors</Typography>
      <Typography variant="body1"sx={{fontSize:{xs: '1rem',sm: '1.2rem',md: '1.5rem'},padding:'1rem 0',}}>{props.project.supervisors}</Typography>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <ProjectDescription project={props.project}/>
    </section>
  );
}

function ProjectDescription(props) {
  const shareUrl = `https://20.108.41.92/projects/${props.project._id}`;
  const tweetText = 'Check out this innovative project!';
  const twitterUrl = `https://twitter.com/share?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const LinkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  

  const handlePrint = () => {
    window.print();
  };

  // const onlineimg = `http://localhost:8080/api/images/${props.project._id}/${props.project.images[0]}`;
  return (
    <div className="projectSections">
      <section className="projectSection">
        <Typography variant="body1" sx={{fontSize:{xs: '1rem',sm: '1.2rem',md: '1.5rem'},padding:'1rem 0',fontWeight:  "bold" }}>Description</Typography>
        <Typography variant="body1" sx={{fontSize:{xs: '1rem',sm: '1.2rem',md: '1.5rem'},padding:'1rem 0', whiteSpace: 'pre-wrap'}}>{props.project.description}</Typography>
       {/* <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</text>
        <br/><br/>*/}
      </section>
      <section className="projectSlider" >
        <SimpleSlider project={props.project}/>
        <div style={{fontSize:'1.5rem', padding:'2rem'}}>Share on social media or print:
          <IconButton href={twitterUrl} ><Twitter style={{fontSize: '2rem'}} /></IconButton>
          <IconButton href={facebookUrl}><Facebook style={{fontSize: '2rem'}}  /></IconButton>
          <IconButton href={LinkedInUrl}><LinkedIn style={{fontSize: '2rem'}} /></IconButton>
          <IconButton onClick={handlePrint}><Print style={{fontSize: '2rem'}} /></IconButton>
        </div>
      </section>
    </div>
  );
}

function SimpleSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section style={{margin:'auto', maxWidth:'70rem'}}>
      <Slider {...settings}>
      {props.project.images && props.project.images.map((image)=>(
        <div>
          <Box sx={{aspectRatio:'16/10', borderRadius:'1rem',backgroundImage:`url(${process.env.REACT_APP_API_URL}images/${props.project._id}/${image})`, backgroundSize: 'cover', backgroundPosition:'center', position:'relative'}} />
        </div>
      ))}
{/*        <div>
          <Box sx={{aspectRatio:'16/10', borderRadius:'1rem',backgroundImage:`url(${ProjectPic1})`, backgroundSize: 'cover', backgroundPosition:'center', position:'relative'}} />
        </div>*/}
      </Slider>
      <p></p>
    </section>
  );
}

function SimilarProjects(props) {
  return (
    <section className="SimilarProject">
      <p style={{fontSize:'3rem', marginBottom:'2rem', textAlign: 'center'}}>Similar Projects</p>
      <hr style={{margin:'0 0 4rem 0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <ThreeProjectTiles project={props.project}/>
    </section>
  );
}

export function ThreeProjectTiles(props){
  const [projects, setProjects] = useState("");
  // console.log(props)
  useEffect(() => {
      axios
      .get(process.env.REACT_APP_API_URL+`projects/${props.project._id}/similar`)
      .then(response => {
          // adding failcase if dont have 3 similar projects
          if (response.data.length < 3) {
            const project_list = response.data.slice(0,response.data.length);
            axios.get(process.env.REACT_APP_API_URL+`projects`)
              .then((response_2) => {                
                const project_list_other = response_2.data.slice(0, (3 - response.data.length))
                const final_list = [...project_list, ...project_list_other]
                setProjects(final_list);
              })
              .catch((error) => {
                console.log(error);
                // setIsLoading(false);
              });
          } else {
            setProjects(response.data.slice(0,3));
          }          
      });
  },[props.project._id]);
  
  // useEffect(() => {
  //   console.log(projects);
  // }, [projects]);

  if (projects === "") {
    return <div>Loading...</div>;
  }

  return(
    <section style={{display: 'flex', flexDirection: 'row', columnGap: '2%'}}>
      <Grid container spacing={1} sx={{ width: "100%" ,padding: "0 1rem",margin:"auto"}} >
        <Grid item xs={12} sm={12} md={12} lg={4} container justifyContent="center">
          <ProjectTile img={`${process.env.REACT_APP_API_URL}images/${projects[0]._id}/${projects[0].images[0]}`} title={projects[0].title} description={projects[0].description} id={projects[0]._id}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} container justifyContent="center">
         <ProjectTile img={`${process.env.REACT_APP_API_URL}images/${projects[1]._id}/${projects[1].images[0]}`} title={projects[1].title} description={projects[1].description} id={projects[1]._id}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} container justifyContent="center">
          <ProjectTile img={`${process.env.REACT_APP_API_URL}images/${projects[2]._id}/${projects[2].images[0]}`} title={projects[2].title} description={projects[2].description} id={projects[2]._id}/>
        </Grid>
      </Grid>
    </section>
  );
}
