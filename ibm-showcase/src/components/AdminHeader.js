import logo from './ibm_logo.svg';
import Button from '@mui/material/Button';
import './AdminHeader.css';
import {Link} from 'react-router-dom';

function AdminHeader() {
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
          <Link to="/createproject" style={styles.link}>Create Projects</Link>
          <Link to="/editproject" style={styles.link}>Edit Projects</Link>
          <a>Create Work Book</a>
          <Link to="/" style={styles.link}>
            <Button variant="outlined" size="small" sx={{textTransform: "none"}}>Log Out & Back to Home</Button>
          {/*Onclick or Anchor or href=?*/}
          </Link>
        </section>
  </header>
  );
}

export default AdminHeader;