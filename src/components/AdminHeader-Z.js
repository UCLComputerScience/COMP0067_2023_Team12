import logo from './ibm_logo_Z.svg';
import Button from '@mui/material/Button';
import './AdminHeader-Z.css';

function Header() {
  return (
  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <section>
          <a>Create Projects</a>
          <a>Edit Projects</a>
          <a>Create Work Book</a>
          <a>
            <Button variant="outlined" size="small" sx={{textTransform: "none"}}>Log Out & Back to Home</Button>
          {/*Onclick or Anchor or href=?*/}
          </a>
        </section>
  </header>
  );
}

export default Header;