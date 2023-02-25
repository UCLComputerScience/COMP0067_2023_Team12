import './HomeBody.css';
import Box from '@mui/material/Box';
import ProjectPic1 from './Project1.png';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme } from '@mui/material/styles';
import PagesIcon from '@mui/icons-material/Pages';

function HomeBody() {
  return (
  <div className="HomeBody" style={{margin:'auto', padding:'0 7rem', position:'relative', maxWidth:'130rem'}}>
    <h1 style={{color:'white', fontSize:'4rem', marginBottom:'1rem'}}><PagesIcon sx={{fontSize:'3rem', padding: '0 0.5rem'}}/>Featured Projects</h1>
    <hr style={{margin:'0 0 3rem 0',  height:'1px', color: '#E6E6E6', backgroundColor: '#E6E6E6', border: 'none'}}/>
    <Box sx={{minHeight: '25rem', borderRadius:'1.5rem',backgroundImage:`url(${ProjectPic1})`, backgroundSize: 'cover'}}>
      <div style={{fontSize: '2rem', color: 'white', padding: '3rem 3rem 1rem 3rem', lineHeight:'90%'}}>UCL Motion Input 3</div>
      <p style={{fontSize: '1.4rem', color: 'white', padding: '0 0 6rem 3rem ', width: '30%', textAlign: 'justify', maxHeight: '50%'}}> 
      Motioninput is a pioneering touchless computing technology devleoped by UCL Computer Science students
      </p>
      <Button 
        size="large" variant="contained"
        sx={{textTransform: "none",paddingRight:'0.7rem', margin:"0 3rem", position:'absolute ', bottom:'1.8rem', borderRadius:'1rem', backgroundColor: "#344DF8"}}
      >
      Read More<ChevronRightIcon sx={{margin:'0 0 0 0.5rem', padding:"0"}}/>
      </Button>
    </Box>
  </div>
  );
}

export default HomeBody;