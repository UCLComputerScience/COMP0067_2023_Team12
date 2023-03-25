import {React, useState} from 'react';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Box, Toolbar, Button,
    IconButton, Typography, Autocomplete, TextField, Paper, InputBase, Divider, Stack,
    Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import IBM_IMG from './ibm_ai4.avif';


const StyledGrid = styled(Grid)`
  background-image: url(${IBM_IMG});
  background-repeat: no-repeat;
  background-size:cover;
  background-position: right;
  
  


`;



function ProjectSearch({ onSubmit }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        onSubmit(inputValue);
        setInputValue(''); 
      }

    return (
        <StyledGrid container sx={{bgcolor:"black", width:"100%"}}>
                    <Box sx={{ width:800,mx:'auto',mt:10,pl:3,pr:3}}>
            <Typography variant='h4' gutterBottom sx = {{color:"white",textAlign:"center"}}>
                Explore exciting projects
            </Typography>



            


            <Box sx={{maxWidth:600,mx:"auto"}}>
            <Typography variant='subtitle' gutterBottom sx = {{color:"white",textAlign:"center"}}>
            Explore all the exciting projects IBM and UCL have worked. From Artificial Intelligence to Quantum Computing
            </Typography>
            </Box>

            

            <Box
            component="form"    
            sx={{ display: 'flex', justifyContent: 'center',height:51,maxWidth:600,mt:4,mx:"auto",
            backgroundColor: '#F3F3F3',borderRadius:"20px" ,flexShrink:1}}
            onSubmit={handleSubmit}
            >

                

            <IconButton type="button" sx={{ display:"flex"}} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase 
                sx={{display:"flex",mr:45}}
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