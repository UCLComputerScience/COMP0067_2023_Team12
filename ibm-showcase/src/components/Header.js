import logo from './Skunk_works_Logo.svg.png';
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
        <img src={logo} className="App-logo" alt="logo" style={{width:'40px',height:'30px'}} />
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