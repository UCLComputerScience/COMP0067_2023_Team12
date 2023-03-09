import * as React from 'react';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Box, Toolbar, Button,
    IconButton, Typography, Autocomplete, TextField, Paper, InputBase, Divider, Stack,
    Grid } from '@mui/material'


    function ProjectFilter() {

        const [selected, setSelected] = React.useState('');

        const selectionChangeHandler = (event) => {
          setSelected(event.target.value);
        };
        
        return (

            <Grid container spacing={2} sx={{width:"100%"}}>
                <Grid item xs = {8}>
                <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",width:134,borderRadius:"30px",position:"fixed",left:"30px",mt:4}}>
                    
                    <InputLabel></InputLabel>
                    <Select value={selected} onChange={selectionChangeHandler} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,textAlign:"center"}}/>}>
                        <MenuItem value={1}>Popular</MenuItem>
                        <MenuItem value={2}>Date</MenuItem>
                    </Select>
                </FormControl>
                </Grid>


                <Grid item xs = {4}>
                <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",width:134,borderRadius:"30px",position:"fixed",right:"30px",mt:4}}>
                    
                    <InputLabel>Category</InputLabel>
                    <Select value={selected} onChange={selectionChangeHandler} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,textAlign:"center"}}/>} >
                        <MenuItem value={3}>Category</MenuItem>
                        <MenuItem value={4}>AI/ML</MenuItem>
                        <MenuItem value={5}>Back-End</MenuItem>
                        <MenuItem value={6}>Cloud</MenuItem>
                        <MenuItem value={7}>Cyber-Security</MenuItem>
                        <MenuItem value={8}>Data Science</MenuItem>
                        <MenuItem value={9}>FinTech</MenuItem>
                        <MenuItem value={10}>Front-End</MenuItem>
                        <MenuItem value={11}>Healthcare</MenuItem>
                        <MenuItem value={12}>Quantum</MenuItem>
                        <MenuItem value={13}>Sustainability</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

                
            </Grid>

            
      
        )
      }
      export default ProjectFilter;
      