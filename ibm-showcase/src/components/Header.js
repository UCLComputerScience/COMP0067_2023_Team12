import logo from './ibm_logo.svg';
import Button from '@mui/material/Button';
import './AdminHeader.css';
import {NavLink} from 'react-router-dom';

function Header() {

  return (
  <header className='Header' style={{maxWidth:'124rem',margin:'auto'}}>
        <img src={logo}  alt="logo" style={{padding:"0 0 0 5rem"}} />
        <section style={{padding:"0 5rem 0 0"}}>
          <NavLink to="/" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: "0.5em",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Home
          </NavLink>
          <NavLink to="/projects" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: "0.5em",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Projects
          </NavLink>
          <NavLink to="/about" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: "0.5em",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          About/Contact Us
          </NavLink>
        </section>
  </header>
  );
}

export default Header;