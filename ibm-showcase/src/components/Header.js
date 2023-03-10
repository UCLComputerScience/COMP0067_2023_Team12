import logo from './ibm_logo.svg';
import Button from '@mui/material/Button';
import './AdminHeader.css';
import {Link} from 'react-router-dom';

function Header() {
  const styles={
    link:{
      textDecoration:'none',
      color:'inherit'
    },
  };
  return (
  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <section>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/projects" style={styles.link} >Projects</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/about" style={styles.link}>Contact Us</Link>
        </section>
  </header>
  );
}

export default Header;