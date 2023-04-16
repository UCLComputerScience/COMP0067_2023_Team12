import {React, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
// import useState from 'react';
import { Select, MenuItem, FormControl, Box, IconButton, InputBase, Grid } from '@mui/material'



function Search({ onSubmit, onSubmit2 }) {
//   const { sections, title } = props;

    // const [selected, setSelected] = useState('');

    const categories = ["AI", "Asset Management", "Automation", "Blockchain", "Capstone", "Cloud", "Data Science", "Design Thinking", "Healthcare", "IT", "Security", "Supply Chain"]

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
    
        
            <Grid container spacing={2} sx ={{width:"100%",justifyContent:'center'}}
            >
        <Grid item sx={{display:'flex',width:850}}>
        <Box 
            component="form"    
            sx={{display: 'flex', alignItems: 'center',height:51,mt:10,width:"100%",ml:2,
            backgroundColor: 'white',flexShrink:1,flexGrow:0,
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
            </Grid>


            <Grid item sx={{display:'flex'}}>
            <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",width:"100%",flexGrow:0,height:51,mt:10,textAlign:"center"}}>
                        
            {/* <InputLabel>Category</InputLabel> */}
            <Select value={selectedFilter} onChange={selectionChangeHandlerFilter} input={<InputBase sx={{borderRadius: '30px',height:51,fontSize:15,textAlign:"center",ml:1, width: '170px',}}/>}>
                        <MenuItem value={1}>All Categories</MenuItem>
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