// React-related imports
import React, { Component } from "react";
// UI component imports
import {Button,CssBaseline,TextField,Box,Typography,Container} from '@mui/material';
// Material UI theme imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Local component imports
import Header from '../components/Header';
// Third-party library imports
import axios from "axios";




const sections = [
    { title: 'Sign In', url: './Sign_In.js'},
    { title: 'Create Projects', url: '#' },
    { title: 'Edit Projects', url: '#' },
    { title: 'Create Workbook', url: '#' },
    { title: 'Log Out & Back To Home', url: '#' },
  ];


const theme = createTheme();

export default class Sign_In extends Component {
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

      submitted: false
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
    // alert("Submitted")
    var data = {
      user: this.state.user,
      password: this.state.password,
    };
  
    //Not correct one. In progress
    axios.post(process.env.REACT_APP_API_URL+'users/register', data)
      .then(response => {
        this.setState({
          id: response.data.id,
          user: response.data.user,
          password: response.data.password,
          
          published: response.data.published,

          submitted: true
        });
      })
      .catch(e => {
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
                Register as Admin
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
                    label="Username"
                    name="email"
                    // autoComplete="email"
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
                        transform: labelStatePass ? 'translate(14px, -6px) scale(0.75)' : 'translate(265px, 16px) scale(1)',
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
                    name="password"
                    label="Password"
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
                {/* <Link to="/editproject" style={{textDecoration:'none',color:'inherit'}}> */}
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
                Register
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