import logo from './ibm_logo.svg';
import Button from '@mui/material/Button';
import './AdminHeader.css';

function Header() {
  return (
  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <section>
          <a>Home</a>
          <a>Projects</a>
          <a>About</a>
          <a>Contact Us</a>
        </section>
  </header>
  );
}

export default Header;