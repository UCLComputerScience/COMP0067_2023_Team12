// import * as React from 'react';
import React, { Component } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import { Toolbar } from '@mui/material';
import axios from "axios";
import {Link, Navigate} from 'react-router-dom';
import withRouter from './withRouter';



const sections = [
    { title: 'Sign In', url: './Sign_In.js'},
    { title: 'Create Projects', url: '#' },
    { title: 'Edit Projects', url: '#' },
    { title: 'Create Workbook', url: '#' },
    { title: 'Log Out & Back To Home', url: '#' },
  ];


const theme = createTheme();

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.newProject = this.newProject.bind(this);

    // unsure if this is best place to put this function
    this.verifyURL()

	  // this.param = useParams();
	  // this.url = `http://localhost:8080/api/resetpassword/${param.user}/${param.token}`;

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
      changePage2: false
    };
  }

  verifyURL() {
    var data = {
      user: this.props.params.user,
      token: this.props.params.token,
    };

    console.log(data)

    axios.post('http://localhost:8080/api/users/verify_link', data)
      .then(response => {
        console.log(response.data);
        alert('The verifying link is correct')
        // this.setState({changePage: true})
      })
      .catch(e => {
        console.log(e);
        alert(e.response.data.message)
        this.setState({changePage2: true})
      });
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
    // alert("Submitted")
    var data = {
      user: this.state.user,
      password: this.state.password,
      token: this.props.params.token
    };
  
    //Not correct one. In progress
    axios.post('http://localhost:8080/api/users/change_password', data)
      .then(response => {
        this.setState({
          id: response.data.id,
          user: response.data.user,
          password: response.data.password,

          token: response.data.token,
          
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
        alert('Successfully changed your password')
        this.setState({changePage: true})
      })
      .catch(e => {
        console.log(e);
        alert(e.response.data.message)
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
    // const { user } = this.props.match.params;
    // const { location, history } = this.props;
    // console.log(this.props.params.user)
    // console.log(user)
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
                Reset Password
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
                <TextField
                    // sx={{ '& .MuiInputLabel-root': { textAlign: 'center' } }}
                    variant='outlined'
                    sx={{
                      width: '600px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3D70B200',
                        backgroundColor: '#3D70B225',
                        borderRadius: '50px !important',},
                      "& .MuiInputLabel-root": {
                        transform: labelStateUser ? 'translate(14px, -6px) scale(0.75)' : 'translate(265px, 16px) scale(1)',
                        transformOrigin: 'top left',
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        transform: 'translate(14px, -6px) scale(0.75)',
                        transformOrigin: 'top left',
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
                      width: '600px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3D70B200',
                        backgroundColor: '#3D70B225',
                        borderRadius: '50px !important',},
                      "& .MuiInputLabel-root": {
                        transform: labelStatePass ? 'translate(14px, -6px) scale(0.75)' : 'translate(232px, 16px) scale(1)',
                        transformOrigin: 'top left',
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        transform: 'translate(14px, -6px) scale(0.75)',
                        transformOrigin: 'top left',
                      }
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
                {this.state.changePage && <Navigate to={'/signin'} /> }
                {this.state.changePage2 && <Navigate to={'/signin'} /> }
                <Button
                // type="submit"
                // fullWidth
                variant="contained"
                sx={{ 
                  width: '200px',
                  borderRadius: '50px',
                  mt: 2, mb: 2,
                  // display: 'flex', 
                  justifyContent: 'center',
                  backgroundColor: '#0062FF',
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

export default withRouter(ResetPassword)