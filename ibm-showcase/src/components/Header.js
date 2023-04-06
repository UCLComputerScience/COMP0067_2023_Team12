import logo from './Skunk_works_Logo.svg.png';
import Button from '@mui/material/Button';
import './AdminHeader.css';
import {NavLink} from 'react-router-dom';

function Header() {

  return (
  <header className='Header' style={{maxWidth:'124rem',margin:'auto'}}>
        <img src={logo}  alt="logo" style={{height:'3.5rem',width:'3.5rem',padding:"0 0 0 5rem"}} />
        <section style={{padding:"0 5rem 0 0"}}>
          <NavLink to="/" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: isActive ? "0.20em" : "0",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Home
          </NavLink>
          <NavLink to="/projects" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: isActive ? "0.20em" : "0",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Projects
          </NavLink>
          <NavLink to="/about" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: isActive ? "0.20em" : "0",
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