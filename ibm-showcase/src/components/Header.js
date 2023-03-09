import logo from './ibm_logo.svg';
import Button from '@mui/material/Button';
import './AdminHeader.css';
import {Link} from 'react-router-dom';

function Header() {
  return (
  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <section>
          <a><Link to="/" >Home</Link></a>
          <a><Link to="/projects" >Projects</Link></a>
          <a><Link to="/about" >About</Link></a>
          <a><Link to="/about" >Contact Us</Link></a>
        </section>
  </header>
  );
}

export default Header;