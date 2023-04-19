import {React, useState, useEffect} from 'react';
import { Box, IconButton, Typography, InputBase, 
    Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import IBM_IMG from './Projectsearch3.jpg';


const StyledGrid = styled(Grid)`
  background-image: url(${IBM_IMG});
  background-repeat: no-repeat;
  background-size:cover
  
  
  
  


`;



function ProjectSearch({ onSubmit, searchInput }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        onSubmit(inputValue);
        // setInputValue(''); 
      }
  
    useEffect(() => {
        setInputValue(searchInput)
        onSubmit(searchInput);
        window.scrollTo(0, 0);
    }, [searchInput]);

    // console.log(inputValue)

    return (
        <StyledGrid container sx={{bgcolor:"black", width:"100%"}}>
                    <Box sx={{ width:800,mx:'auto',mt:10,pl:3,pr:3}}>
            <Typography variant='h4' gutterBottom sx = {{color:"white",textAlign:"center"}}>
                Explore exciting projects
            </Typography>



            


            <Box sx={{maxWidth:600,mx:"auto"}}>
            <Typography variant='subtitle' gutterBottom sx = {{color:"white",textAlign:"center"}}>
            Explore all the exciting projects IBM and UCL have worked on. From Artificial Intelligence to Healthcare
            </Typography>
            </Box>

            

            <Box
            component="form"    
            sx={{ display: 'flex', justifyContent: 'center',height:51,maxWidth:600,mt:4,mx:"auto",
            backgroundColor: '#F3F3F3',borderRadius:"20px" ,flexShrink:1,
            position: 'relative',}}
            onSubmit={handleSubmit}
            >

                

            <IconButton type="submit" sx={{ display:"flex"}} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase 
                sx={{ ml: 1, display: 'flex', flexGrow: 1 }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                value={inputValue}
                onChange={handleInputChange}
            />
            </Box>
            <Box sx={{mt:4,mb:3,mx:"auto",ml:7}}> 

            
                {/* <Typography variant='caption' gutterBottom sx={{color:"white"}}>
                    Trending searches
                </Typography>
                <Button sx ={{bgcolor:"#F3F3F3",ml:2,width:95,textTransform:"none",borderRadius:"25px"}}
                    variant='contained'
                    size='small'
                    color="inherit"
                >
                    AI
                </Button>
                <Button sx ={{bgcolor:"#F3F3F3",ml:2,width:95,textTransform:"none",borderRadius:"25px"}}
                    variant='contained'
                    size='small'
                    color="inherit"
                >
                    Healthcare
                </Button>
                <Button sx ={{bgcolor:"#F3F3F3",ml:2,width:95,textTransform:"none",borderRadius:"25px"}}
                    variant='contained'
                    size='small'
                    color="inherit"
                >
                    Blockchain
                </Button>
                <Button sx ={{bgcolor:"#F3F3F3",ml:2,width:95,textTransform:"none",borderRadius:"25px"}}
                    variant='contained'
                    size='small'
                    color="inherit"
                >
                    Fintech
                </Button>
                <Button sx ={{bgcolor:"#F3F3F3",ml:2,width:95,textTransform:"none",borderRadius:"25px"}}
                    variant='contained'
                    size='small'
                    color="inherit"
                >
                    Cloud
                </Button> */}
            </Box> 
      </Box>
        </StyledGrid>
   

  
    )
  }
  export default ProjectSearch