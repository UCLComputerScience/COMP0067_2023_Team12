import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './IndividualProjectPage.css';
import Header from './Header'
import {ProjectTile} from './HomeBody'
import Box from '@mui/material/Box';
import ProjectPic1 from './Project1.png';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Twitter, Reddit, Facebook, LinkedIn, Print } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {useParams} from 'react-router-dom'
import axios from "axios";
import Footer from './Footer'

function IndividualProjectPage() {
  const {id} = useParams();
  const [project, setProject] = useState("");
  const [shouldRenderSimilarProjects, setShouldRenderSimilarProjects] = useState(false);
  useEffect(() => {
    axios
    .get(`http://localhost:8080/api/projects/${id}`)
    .then(response => {
        console.log(response.data);
        setProject(response.data);
        setShouldRenderSimilarProjects(true);
        window.scrollTo(0, 0);
    });
  },[id]);
  return (
    <div className="IndividualProjectPage">
      <Header />
      <ProjectVideoSection project={project}/>
      <ProjectDetail project={project}/>
      {shouldRenderSimilarProjects && <SimilarProjects project={project}/>}
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
    
    <Box sx={{position:'relative',minHeight: '40rem',backgroundImage:`url(${ProjectPic1})`, backgroundSize: 'cover'}}>
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
          <PlayCircleIcon sx={{fontSize: '5rem', color: 'white', position:'absolute', left: '50%', top: '50%', transform:`translate(-50%, -50%)`,cursor: 'pointer'}} onClick={handlePlayClick}/>
          <div style={{position:'absolute',fontSize: '1.5rem', color: 'white', bottom:'7rem', left: '50%', transform: `translateX(-50%)`}}>{props.project.groupMembers}</div>
          <div style={{position:'absolute',fontSize: '3rem', color: 'white', bottom:'3rem', left: '50%', transform: `translateX(-50%)`}}>{props.project.title}</div>
        </div>
      )}
      
      
      
    </Box>
  );
}

function ProjectDetail(props) {
  return (
    <section style={{margin:'auto', padding:'0 7rem', maxWidth:'130rem',fontSize:'2rem', lineHeight:'90%', position:'relative'}}>
      <p style={{fontSize:'3rem'}}>{props.project.title}</p>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <p><b>Group Members</b></p>
      <p>{props.project.groupMembers}</p>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <p><b>Supervisors</b></p>
      <p>{props.project.supervisors}</p>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <ProjectDescription project={props.project}/>
    </section>
  );
}

function ProjectDescription(props) {
  const shareUrl = 'https://www.ibm.com/blogs/think/uk-en/this-is-john-creating-collaborative-projects-with-universities/';
  const tweetText = 'Check out this innovative project!';
  const tweethashtags = ['hashtag1', 'hashtag2', 'hashtag3'];
  const twitterUrl = `https://twitter.com/share?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(tweethashtags.join(' #'))}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const LinkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  

  const handlePrint = () => {
    window.print();
  };

  // const onlineimg = `http://localhost:8080/api/images/${props.project._id}/${props.project.images[0]}`;
  return (
    <div style={{display:'flex', flex:'1'}}>
      <section style={{width:'50%'}}>
        <p><b>Description</b></p>
        <div>{props.project.description}</div>
       {/* <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</text>
        <br/><br/>*/}
      </section>
      <section style={{width:'50%',margin:'6rem 0 1rem 1rem'}}>
        <SimpleSlider project={props.project}/>
        <div style={{fontSize:'1.5rem', padding:'2rem'}}>Share on social media or print:
          <IconButton href={twitterUrl} ><Twitter style={{fontSize: '3rem'}}/></IconButton>
          <IconButton href={facebookUrl}><Facebook style={{fontSize: '3rem'}} /></IconButton>
          <IconButton href={LinkedInUrl}><LinkedIn style={{fontSize: '3rem'}} /></IconButton>
          <IconButton onClick={handlePrint}><Print style={{fontSize: '3rem'}} /></IconButton>
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
          <Box sx={{aspectRatio:'16/10', borderRadius:'1rem',backgroundImage:`url(http://localhost:8080/api/images/${props.project._id}/${image})`, backgroundSize: 'cover', backgroundPosition:'center', position:'relative'}} />
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
    <section style={{margin:'auto', padding:'4rem 7rem 8rem 7rem', maxWidth:'130rem',fontSize:'2rem', lineHeight:'90%', position:'relative'}}>
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
      .get(`http://localhost:8080/api/projects/${props.project._id}/similar`)
      .then(response => {
          // adding failcase if dont have 3 similar projects
          if (response.data.length < 3) {
            const project_list = response.data.slice(0,response.data.length);
            axios.get(`http://localhost:8080/api/projects`)
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
      <ProjectTile img={`http://localhost:8080/api/images/${projects[0]._id}/${projects[0].images[0]}`} title={projects[0].title} description={projects[0].description} id={projects[0]._id}/>
      <ProjectTile img={`http://localhost:8080/api/images/${projects[1]._id}/${projects[1].images[0]}`} title={projects[1].title} description={projects[1].description} id={projects[1]._id}/>
      <ProjectTile img={`http://localhost:8080/api/images/${projects[2]._id}/${projects[2].images[0]}`} title={projects[2].title} description={projects[2].description} id={projects[2]._id}/>
    </section>
  );
}
