import logo from './Skunk_works_Logo.svg.png';
import Button from '@mui/material/Button';
import './Header.css';
import {NavLink} from 'react-router-dom';

function Header() {

  return (
  <header className='Header' style={{margin:'auto'}}>
        <img src={logo}  alt="logo" className="logo"  />
        <section className="nav-section" >
          <NavLink to="/" className="nav-link" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: isActive ? "0.35em" : "0",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          lineHeight: isActive ? "1.5" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Home
          </NavLink>
          <NavLink to="/projects" className="nav-link" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: isActive ? "0.35em" : "0",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          lineHeight: isActive ? "1.5" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Projects
          </NavLink>
          <NavLink to="/about" className="nav-link" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: isActive ? "0.35em" : "0",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          lineHeight: isActive ? "1.5" : "",
                          color: isActive ? "#191970" : "black",})}>
                          About/Contact Us
          </NavLink>
        </section>
  </header>
  );
}

export default Header;