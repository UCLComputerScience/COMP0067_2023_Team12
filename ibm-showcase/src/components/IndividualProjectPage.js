import { useState } from 'react';
import ReactPlayer from 'react-player';
import './IndividualProjectPage.css';
import Header from './Header'
import {ThreeProjectTiles} from './HomeBody'
import Box from '@mui/material/Box';
import ProjectPic1 from './Project1.png';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ProjectPic2 from './Project2.jpeg';
import ProjectPic3 from './Project3.png';
import ProjectPic4 from './Project4.jpg';
import { Twitter, Reddit, Facebook, LinkedIn, Print } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function IndividualProjectPage() {
  return (
    <div className="IndividualProjectPage">
      <Header />
      <ProjectVideoSection />
      <ProjectDetail />
      <SimilarProjects />
    </div>
  );
}

export default IndividualProjectPage;

function ProjectVideoSection() {
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
            url='https://www.youtube.com/watch?v=JWE4ba_0was&t=1s'
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
          <div style={{position:'absolute',fontSize: '1.5rem', color: 'white', bottom:'7rem', left: '50%', transform: `translateX(-50%)`}}>Minhaz Hassan / James Rudd Jones / Ziyu Xu / Nozomu Kitamura</div>
          <div style={{position:'absolute',fontSize: '3rem', color: 'white', bottom:'3rem', left: '50%', transform: `translateX(-50%)`}}>UCL Motion Input 3</div>
        </div>
      )}
      
      
      
    </Box>
  );
}

function ProjectDetail() {
  return (
    <section style={{margin:'auto', padding:'0 7rem', maxWidth:'130rem',fontSize:'2rem', lineHeight:'90%', position:'relative'}}>
      <p style={{fontSize:'3rem'}}>UCL Motion Input 3</p>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <p><b>Group Members</b></p>
      <p>Minhaz Hassan, James Rudd Jones, Ziyu Xu, Nozomu Kitamura</p>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <p><b>Supervisors</b></p>
      <p>Dr John McNamara</p>
      <hr style={{margin:'0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <ProjectDescription />
    </section>
  );
}

function ProjectDescription() {
  const shareUrl = 'https://www.ibm.com/blogs/think/uk-en/this-is-john-creating-collaborative-projects-with-universities/';
  const tweetText = 'Check out this innovative project!';
  const tweethashtags = ['hashtag1', 'hashtag2', 'hashtag3'];
  const twitterUrl = `https://twitter.com/share?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(tweethashtags.join(' #'))}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const LinkedInUrl = `https://www.linkedin.com/shareArticle?url=` + encodeURIComponent(shareUrl);
  const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{display:'flex', flex:'1'}}>
      <section style={{width:'60%'}}>
        <p><b>Description</b></p>
        <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</text>
        <br/><br/>
        <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</text>
        <br/><br/>
        <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</text>
      </section>
      <section style={{width:'40%',margin:'2rem 0 1rem 1rem'}}>
        <SimpleSlider/>
        <div style={{fontSize:'1.5rem', padding:'2rem'}}>Share on social media or print: 
          <IconButton href={twitterUrl} ><Twitter style={{fontSize: '3rem'}}/></IconButton>
          <IconButton href={facebookUrl}><Facebook style={{fontSize: '3rem'}} /></IconButton>
          <IconButton href={LinkedInUrl}><LinkedIn style={{fontSize: '3rem'}} /></IconButton>
          <IconButton href={redditUrl}><Reddit style={{fontSize: '3rem'}} /></IconButton>
          <IconButton onClick={handlePrint}><Print style={{fontSize: '3rem'}} /></IconButton>
        </div>
      </section>
    </div>
  );
}

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section style={{margin:'auto', maxWidth:'30rem'}}>
      <Slider {...settings}>
        <div>
          <Box sx={{aspectRatio:'16/10', borderRadius:'1rem',backgroundImage:`url(${ProjectPic1})`, backgroundSize: 'cover', backgroundPosition:'center', position:'relative'}} />
        </div>
        <div>
          <Box sx={{aspectRatio:'16/10', borderRadius:'1rem',backgroundImage:`url(${ProjectPic2})`, backgroundSize: 'cover', backgroundPosition:'center', position:'relative'}} />
        </div>
        <div>
          <Box sx={{aspectRatio:'16/10', borderRadius:'1rem',backgroundImage:`url(${ProjectPic3})`, backgroundSize: 'cover', backgroundPosition:'center', position:'relative'}} />
        </div>
        <div>
          <Box sx={{aspectRatio:'16/10', borderRadius:'1rem',backgroundImage:`url(${ProjectPic4})`, backgroundSize: 'cover', backgroundPosition:'center', position:'relative'}} />
        </div>
      </Slider>
      <p></p>
    </section>
  );
}

function SimilarProjects() {
  return (
    <section style={{margin:'auto', padding:'4rem 7rem 8rem 7rem', maxWidth:'130rem',fontSize:'2rem', lineHeight:'90%', position:'relative'}}>
      <p style={{fontSize:'3rem', marginBottom:'2rem', textAlign: 'center'}}>Similar Projects</p>
      <hr style={{margin:'0 0 4rem 0',  height:'0.1rem', color: '#858282', backgroundColor: '#858282', border: 'none'}}/>
      <ThreeProjectTiles/>
    </section>
  );
}
