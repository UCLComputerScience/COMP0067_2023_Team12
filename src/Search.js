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

function Search() {
//   const { sections, title } = props;

  const [selected, setSelected] = React.useState('');

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };

  return (
    <React.Fragment>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* <Box className="App"
            sx={{
            width: 800,
            height: 100,
            margin: '100px auto',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
            }}>
            <TextField
                variant='filled'
                label='Search..'
            /TextField>

            
        </Box> */}

        {/* <Stack direction='row' spacing={2}> */}

        <Box 
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800, 
            backgroundColor: 'white' }}
            >
            {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
            </IconButton> */}
            <InputBase 
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
            {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"> */}
                {/* <SearchIcon /> */}
            {/* </IconButton> */}
        </Box>

        <FormControl variant='outlined' style={{ marginTop: 100, marginLeft: 100 }}>
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
            <FormHelperText>Select a category</FormHelperText>
        </FormControl>

        {/* </Stack> */}

      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        <Grid container spacing={0}>
            <Grid xs={0}>
                <Button
                    variant='contained'
                    size='large'
                    color="inherit"
                >
                    Edit
                </Button>
            </Grid>
            <Grid xs={1}>
                <Button
                    variant='contained'
                    size='large'
                    color="inherit"
                >
                    Delete
                </Button>
            </Grid>
            <Grid xs={10}>
                <Button
                    variant='contained'
                    size='large'
                    color="inherit"
                    sx={{ justifyContent: "space-between", float: "right"}}
                >
                    Create Workbook
                </Button>
            </Grid>         
        </Grid>
      </Toolbar>
    </React.Fragment>
  );
}

// Search.propTypes = {
//   sections: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       url: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   title: PropTypes.string.isRequired,
// };

export default Search;