import * as React from 'react';
import { useState } from 'react';
import logo from './Skunk_works_Logo.svg.png';
import './AdminHeader.css';
import {Link, NavLink,useNavigate} from 'react-router-dom';
import { Select, MenuItem,  Button,InputBase, } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';


function AdminHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };
  const handleIconClick = (event) => {
    event.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  <header className="header" style={{margin:'auto'}}>
        <img src={logo} alt="logo" className="logo"/>
        <section className="nav-section" >
          
          <NavLink to="/createproject" className="nav-link" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: isActive ? "0.35em" : "0",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          lineHeight: isActive ? "1.5" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Create Projects
          </NavLink>
         
          <NavLink to="/editproject" className="nav-link" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: isActive ? "0.35em" : "0",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          lineHeight: isActive ? "1.5" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Edit Projects
          </NavLink>
          <NavLink to="/editabout" className="nav-link" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: isActive ? "0.35em" : "0",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          lineHeight: isActive ? "1.5" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Edit About
          </NavLink>
          
          <Button variant="text"size="small"><SupervisorAccountIcon onClick={handleIconClick}/>
            <Select open={open} onClick={handleIconClick} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,textAlign:"center"}}/>} >
            <Link to="/changepassword" style={{textDecoration: "none",color:'inherit'}}><MenuItem value={1}><SettingsIcon/>Change Password</MenuItem></Link>
            <MenuItem value={2} onClick={handleLogout}><LogoutIcon/>Log out</MenuItem>
            </Select>
          </Button>
        </section>
  </header>
  );
}

export default AdminHeader;

