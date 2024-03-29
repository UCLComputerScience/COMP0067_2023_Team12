// React-related imports
import React, { Component } from "react";
import { Link, Navigate } from 'react-router-dom';
// Third-party library imports
import axios from "axios";
// UI component imports
import {Button,TextField,Box,Typography,Container,Alert} from '@mui/material';
// Material UI theme imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Local component imports
import Header from '../components/Header';


const sections = [
    { title: 'Sign In', url: './SignIn.js'},
    { title: 'Create Projects', url: '#' },
    { title: 'Edit Projects', url: '#' },
    { title: 'Create Workbook', url: '#' },
    { title: 'Log Out & Back To Home', url: '#' },
  ];


const theme = createTheme();

// The function SignIn is adapated from https://github.com/bezkoder/react-crud-web-api
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.newProject = this.newProject.bind(this);

    this.state = {
      id: null,
      user: "",
      password: "",
      published: false,

      labelStateUser: false,
      labelStatePass: false,

      submitted: false,
      token: "",
      changePage: false,
      error: null
    };
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  saveProject(e) {
    console.log("123456")
    e.preventDefault();
    var data = {
      user: this.state.user,
      password: this.state.password,
    };
  
    axios.post(process.env.REACT_APP_API_URL+'users/login', data)
      .then(response => {
        this.setState({
          id: response.data.id,
          user: response.data.user,
          password: response.data.password,
          
          published: response.data.published,

          submitted: true,
          token: response.data.token
        });
        localStorage.setItem('token', response.data)
        this.setState({changePage: true})
        localStorage.setItem('isLoggedIn', 'true');
      })
      .catch(e => {
        console.log(e);
        this.setState({ error: e.response.data.message });
      });
  }

  newProject() {
    this.setState({
      id: null,
      user: "",
      password: "",
      published: false,

      submitted: false
    });
  }


  handleFocusUser = () => {
    this.setState({
      labelStateUser: true,
    });
  }

  handleBlurUser = (event) => {
    if (!event.target.value) {
      this.setState({
        labelStateUser: false,
      });
    }
  }

  handleFocusPass = () => {
    this.setState({
      labelStatePass: true,
    });
  }

  handleBlurPass = (event) => {
    if (!event.target.value) {
      this.setState({
        labelStatePass: false,
      });
    }
  }

  

  render () {
    const { labelStateUser } = this.state;
    const { labelStatePass } = this.state;
  return (
    <ThemeProvider theme={theme}>
        <Header title="Blog" sections={sections} />
        <Container component="main" maxWidth="xs" justify="flex-end" alignItems="center" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '90vh',
          // not 100vh since this window height includes the browser search bar and stuff so using 90% instead as this avoids the issue
        }}>  
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
            }}
            >
            <Typography component="h1" variant="h5">
                Login as Admin
            </Typography>
            {this.state.error && (
              <Alert severity="error" onClose={() => this.setState({ error: null })}>
                {this.state.error}
              </Alert>
            )}
            <Box component="form" sx={{ mt: 1 }} onSubmit={this.saveProject}>
                <TextField
                    variant='outlined'
                    sx={{
                      width: { xs: '100%', sm: '600px' },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3D70B200',
                        backgroundColor: '#3D70B225',
                        borderRadius: '50px !important',},
                      "& .MuiInputLabel-root": {
                        transform: labelStateUser ? 'translate(14px, -6px) scale(0.75)' :  { xs: 'translate(200%, 16px) scale(1)', sm: 'translate(265px, 16px) scale(1)' },
                        transformOrigin: 'top left',
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        transform: 'translate(14px, -6px) scale(0.75)',
                        transformOrigin: 'top left',
                      },
                      "@media (max-width: 400px)": {
                        "& .MuiInputLabel-root": {transform: labelStateUser? 'translate(14px, -6px) scale(0.75)': 'translate(180%, 16px) scale(1)'},
                      },
                    }}
                    
                    margin="normal"
                    fullWidth
                    id="user"
                    label="Username"
                    name="email"
                    value={this.state.user}
                    onChange={this.onChangeUser}
                    autoFocus

                    InputLabelProps={{
                      shrink: labelStateUser,
                    }}
                    onFocus={this.handleFocusUser}
                    onBlur={this.handleBlurUser}
                    inputProps={{
                      style: {
                        caretColor: labelStateUser ? 'green' : 'blue',
                      },
                      ref: this.inputRef,
                    }}

                />
                <TextField
                    sx={{
                      width: { xs: '100%', sm: '600px' },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3D70B200',
                        backgroundColor: '#3D70B225',
                        borderRadius: '50px !important',},
                      "& .MuiInputLabel-root": {
                        transform: labelStatePass ? 'translate(14px, -6px) scale(0.75)' : { xs: 'translate(210%, 16px) scale(1)', sm: 'translate(265px, 16px) scale(1)' },
                        transformOrigin: 'top left',
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        transform: 'translate(14px, -6px) scale(0.75)',
                        transformOrigin: 'top left',
                      },
                      "@media (max-width: 400px)": {
                        "& .MuiInputLabel-root": {transform: labelStateUser? 'translate(14px, -6px) scale(0.75)': 'translate(190%, 16px) scale(1)'},
                      },
                    }}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}

                    InputLabelProps={{
                      shrink: labelStatePass,
                    }}
                    onFocus={this.handleFocusPass}
                    onBlur={this.handleBlurPass}
                    inputProps={{
                      style: {
                        caretColor: labelStatePass ? 'green' : 'blue',
                      },
                      ref: this.inputRef,
                    }}
                />
                <Box>
                  <Link to='/forgotpassword'>
                    Forgot password?
                  </Link>
                </Box>
                <Box 
                sx={{
                  display: 'flex', 
                  justifyContent: 'center'
                }}>
                {this.state.changePage && <Navigate to={'/editproject'} /> }
                <Button
                type="submit"
                variant="contained"
                sx={{ 
                  width: '200px',
                  borderRadius: '50px',
                  mt: 2, mb: 2,
                  justifyContent: 'center',
                  backgroundColor: '#0062FF',
                  textTransform: "none"
                 }}
                >
                Login
                </Button>
                </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
}