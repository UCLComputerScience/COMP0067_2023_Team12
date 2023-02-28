import ProjectPic1 from './Project1.png';
import Box from '@mui/material/Box';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function IndividualProjectPageBody() {
  return (
  <section>
    <Box sx={{position:'relative',minHeight: '40rem',backgroundImage:`url(${ProjectPic1})`, backgroundSize: 'cover',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Box>
      <PlayCircleIcon sx={{fontSize: '5rem', color: 'white'}}/>
      </Box>
      <div style={{position:'relative',fontSize: '3rem', color: 'white', textAlign:'center', marginTop:'1rem'}}>UCL Motion Input 3</div>
    </Box>
    <Box sx={{fontSize:'2rem',lineHeight:'90%'}}>
      <p style={{fontSize:'3rem'}}>UCL Motion Input 3</p>
      <p><b>Group Members</b></p>
      <p>Minhaz Hassan, James Rudd Jones, Ziyu Xu, Nozomu Kitamura</p>
      <p><b>Supervisors</b></p>
      <p>Dr John McNamara</p>
    </Box>
  </section>
  );
  }
  
  export default IndividualProjectPageBody;


