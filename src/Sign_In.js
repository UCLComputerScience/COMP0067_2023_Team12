import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import { Toolbar } from '@mui/material'

const sections = [
    { title: 'Sign In', url: './Sign_In.js'},
    { title: 'Create Projects', url: '#' },
    { title: 'Edit Projects', url: '#' },
    { title: 'Create Workbook', url: '#' },
    { title: 'Log Out & Back To Home', url: '#' },
  ];

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (

        

    <ThemeProvider theme={theme}>
        <Header title="Blog" sections={sections} />
        <Container component="main" maxWidth="xs" justify="flex-end" alignItems="center">  
        {/* TODO trying to vertically centre the whole thing but is not working with the justify and alignItems */}
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
                Login as Admin
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    sx={{input: {textAlign: "center"}}}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    sx={{labelAlign: "right", float:'right'}}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Grid container>
                <Grid item xs>
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                />
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Login
                </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            {/* </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}