// React-related imports
import React, { Component } from "react";
import { Link, Navigate } from 'react-router-dom';
// Third-party library imports
import axios from "axios";
// UI component imports
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Local component imports
import AdminHeader from '../components/AdminHeader';
// Style imports
import { createTheme, ThemeProvider } from '@mui/material/styles';


const sections = [
    { title: 'Sign In', url: './Sign_In.js'},
    { title: 'Create Projects', url: '#' },
    { title: 'Edit Projects', url: '#' },
    { title: 'Create Workbook', url: '#' },
    { title: 'Log Out & Back To Home', url: '#' },
  ];


const theme = createTheme();

export default class ChangePassword extends Component {
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

      token: "",

      published: false,

      labelStateUser: false,
      labelStatePass: false,

      submitted: false,
      changePage: false,
      error: null,
      success: null,
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

  saveProject() {
    var data = {
      user: this.state.user,
      password: this.state.password,
      token: localStorage.getItem('token')
    };
  
    axios.post(process.env.REACT_APP_API_URL+'users/change_password', data)
      .then(response => {
        this.setState({
          id: response.data.id,
          user: response.data.user,
          password: response.data.password,

          token: response.data.token,
          
          published: response.data.published,

          submitted: true
        });
        this.setState({ success: 'Successfully changed your password' });
      })
      .catch(e => {
        this.setState({ error: e.response.data.message });
      });
  }

  newProject() {
    this.setState({
      id: null,
      user: "",
      password: "",

      token: "",

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
        <AdminHeader title="Blog" sections={sections} />
        <Container component="main" maxWidth="xs" justify="flex-end" alignItems="center" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '90vh',
          // not 100vh since this window height includes the browser search bar and stuff so using 90% instead as this avoids the issue
        }}>  
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
                Change Password 
            </Typography>
            {this.state.error && (
              <Alert severity="error" onClose={() => this.setState({ error: null })}>
                {this.state.error}
              </Alert>
            )}
            {this.state.success && (
              <Alert severity="success" onClose={() => this.setState({
                success: null,
              })}
              action={
                <Button color="inherit" size="small" onClick={() => {
                  this.setState({ success: null });
                  this.setState({ changePage: true });
                }}>
                  Continue
                </Button>
              }>
                {this.state.success}
              </Alert>
            )}
            <Box component="form" sx={{ mt: 1 }}>
                <TextField
                    // sx={{ '& .MuiInputLabel-root': { textAlign: 'center' } }}
                    variant='outlined'
                    sx={{
                      width: { xs: '100%', sm: '600px' },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3D70B200',
                        backgroundColor: '#3D70B225',
                        borderRadius: '50px !important',},
                      "& .MuiInputLabel-root": {
                        transform: labelStateUser ? 'translate(14px, -6px) scale(0.75)' :  { xs: 'translate(210%, 16px) scale(1)', sm: 'translate(265px, 16px) scale(1)' },
                        transformOrigin: 'top left',
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        transform: 'translate(14px, -6px) scale(0.75)',
                        transformOrigin: 'top left',
                      },
                      "@media (max-width: 400px)": {
                        "& .MuiInputLabel-root": {transform: labelStateUser? 'translate(14px, -6px) scale(0.75)': 'translate(200%, 16px) scale(1)'},
                      },
                    }}
                    
                    margin="normal"
                    // required
                    fullWidth
                    id="user"
                    label="Password"
                    name="user"
                    type="password"
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
                        transform: labelStatePass ? 'translate(14px, -6px) scale(0.75)' :  { xs: 'translate(100%, 16px) scale(1)', sm: 'translate(232px, 16px) scale(1)' },
                        transformOrigin: 'top left',
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        transform: 'translate(14px, -6px) scale(0.75)',
                        transformOrigin: 'top left',
                      },
                      "@media (max-width: 400px)": {
                        "& .MuiInputLabel-root": {transform: labelStateUser? 'translate(14px, -6px) scale(0.75)': 'translate(90%, 16px) scale(1)'},
                      },
                    }}
                    margin="normal"
                    // required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    // autoComplete="current-password"
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
                <Box 
                sx={{
                  display: 'flex', 
                  justifyContent: 'center'
                }}>
                {this.state.changePage && <Navigate to={'/editproject'} /> }
                <Link to="/editproject" style={{textDecoration:'none'}}>
                <Button
                variant="outlined"
                sx={{
                  width: '200px',
                  borderRadius: '50px',
                  mt: 2, mb: 2, mr: 8,
                  // display: 'flex', 
                  justifyContent: 'center',
                  textTransform: "none"
                }}
              >
                Cancel
              </Button>
              </Link>
              <Button
              variant="contained"
              sx={{ 
                width: '200px',
                borderRadius: '50px',
                mt: 2, mb: 2,
                // display: 'flex', 
                justifyContent: 'center',
                backgroundColor: '#0062FF',
                textTransform: "none"
                }}
              onClick={this.saveProject}
              >
              Submit
              </Button>
              {/* </Link> */}
              </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
}