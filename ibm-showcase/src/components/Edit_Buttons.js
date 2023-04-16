import * as React from 'react';
// import useState from 'react';
import { Box, Toolbar, Button, AppBar} from '@mui/material'

function Edit_Buttons() {
//   const { sections, title } = props;

  const [selected, setSelected] = React.useState('');

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };

  return (
    <React.Fragment>
        {/* <Grid container spacing={0}>
            <Grid xs={2}>
                <Button
                    variant='contained'
                    size='large'
                    color="inherit"
                >
                    Edit
                </Button>
            </Grid>
            <Grid xs={3}>
                <Button
                    variant='contained'
                    size='large'
                    color="inherit"
                >
                    Delete
                </Button>
            </Grid>
            <Grid xs={7}>
                <Button
                    variant='contained'
                    size='large'
                    color="inherit"
                    sx={{ justifyContent: "space-between" }}
                >
                    Create Workbook
                </Button>
            </Grid>   
            <Grid xs={20}>
            </Grid>      
        </Grid> */}



        <AppBar >
            <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant='contained'
                    size='large'
                    color="inherit"
                >
                    Delete
                </Button>
                <Button
                    variant='contained'
                    size='large'
                    color="inherit"
                    sx={{ justifyContent: "space-between" }}
                >
                    Create Workbook
                </Button>
            </Toolbar>
        </AppBar>


        


    </React.Fragment>
  );
}

export default Edit_Buttons;