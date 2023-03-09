import * as React from 'react';
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


function Search() {
//   const { sections, title } = props;

  const [selected, setSelected] = React.useState('');

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };

  return (
    
        
            <Grid container spacing={2} sx ={{width:"100%"}}
            >
        <Grid item xs ={10}>
        <Box 
            component="form"    
            sx={{display: 'flex', alignItems: 'center', maxWidth:900,height:51,mt:10,
            backgroundColor: 'white',flexShrink:1,mx:"auto"}}
            >
            <IconButton type="button" sx={{ display:"flex"}} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase 
                sx={{ ml: 1, display:"flex"}}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
            />
            </Box>
            </Grid>


            <Grid item xs = {2}>
            <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",maxWidth:134,mt:10}}>
                        
            <InputLabel>Category</InputLabel>
            <Select value={selected} onChange={selectionChangeHandler}>
                <MenuItem value={1}>AI/ML</MenuItem>
                <MenuItem value={2}>Back-End</MenuItem>
                <MenuItem value={3}>Cloud</MenuItem>
                <MenuItem value={4}>Cyber-Security</MenuItem>
                <MenuItem value={5}>Data Science</MenuItem>
                <MenuItem value={6}>FinTech</MenuItem>
                <MenuItem value={7}>Front-End</MenuItem>
                <MenuItem value={8}>Healthcare</MenuItem>
                <MenuItem value={9}>Quantum</MenuItem>
                <MenuItem value={10}>Sustainability</MenuItem>
            </Select>
        </FormControl>
        </Grid>
        </Grid>


        

      

      



    
  );
}



export default Search;