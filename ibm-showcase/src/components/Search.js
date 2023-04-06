import {React, useState} from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';
import Link from '@mui/material/Link';
// import useState from 'react';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Box, Toolbar, Button,
IconButton, Typography, Autocomplete, TextField, Paper, InputBase, Divider, Stack,
Grid } from '@mui/material'
import { Container } from '@mui/system';


function Search({ onSubmit, onSubmit2 }) {
//   const { sections, title } = props;

    // const [selected, setSelected] = useState('');

    const categories = ["AI/ML", "Back-End", "Cloud", "Cyber-Security", "Data Science", "FinTech", "Front-End", "Healthcare", "Quantum", "Sustaianability"]

    const [selectedFilter, setSelectedFilter] = useState(1);

    const [inputValue, setInputValue] = useState('');


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        onSubmit(inputValue);
        }

    const selectionChangeHandlerFilter = (event) => {
        setSelectedFilter(event.target.value);
        // console.log(event.target.value)
        onSubmit2(event.target.value);
    };

  return (
    
        
            <Grid container spacing={2} sx ={{width:"100%"}}
            >
        <Grid item xs ={10}>
        <Box 
            component="form"    
            sx={{display: 'flex', alignItems: 'center', maxWidth:900,height:51,mt:10,
            backgroundColor: 'white',flexShrink:1,mx:"auto"}}
            onSubmit={handleSubmit}
            >
            <IconButton type="button" sx={{ display:"flex"}} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase 
                sx={{ ml: 1, display:"flex"}}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                value={inputValue}
                onChange={handleInputChange}
            />
            </Box>
            </Grid>


            <Grid item xs = {2}>
            <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",maxWidth:134,mt:10}}>
                        
            <InputLabel>Category</InputLabel>
            <Select value={selectedFilter} onChange={selectionChangeHandlerFilter} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,textAlign:"center"}}/>} >
                        <MenuItem value={1}>No Category</MenuItem>
                        {categories.map((category, index) => (
                          <MenuItem key={index+2} value={index+2}>{category}</MenuItem>
                        ))}
                    </Select>
        </FormControl>
        </Grid>
        </Grid>       
  );
}

export default Search;