import * as React from 'react';
import logo from './Skunk_works_Logo.svg.png';
import './AdminHeader.css';
import {Link, NavLink} from 'react-router-dom';
import { Select, MenuItem,  Button,InputBase, } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


function AdminHeader() {
  return (
  <header style={{margin:'auto'}}>
        <img src={logo} alt="logo" style={{height:'3.5rem',width:'3.5rem',padding:'0 0 0 4rem'}} />
        <section style={{padding:'0 4rem 0 0'}} >
          
          <NavLink to="/createproject" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: "0.5em",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Create Projects
          </NavLink>
         
          <NavLink to="/editproject" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: "0.5em",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Edit Projects
          </NavLink>
          {/* <a>Create Work Book</a> */}
  
          <NavLink to="/changepassword" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: "0.5em",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Change Password
          </NavLink>
          
          <Button variant="text"size="small"><SupervisorAccountIcon></SupervisorAccountIcon>
            <Select input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,textAlign:"center"}}/>} >
            <Link to="/" style={{textDecoration: "none",color:'inherit'}}><MenuItem value={1}><LogoutIcon></LogoutIcon>Log out</MenuItem></Link>
            </Select>
          </Button>
        </section>
  </header>
  );
}

export default AdminHeader;

