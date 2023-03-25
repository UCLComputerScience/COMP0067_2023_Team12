import logo from './Skunk_works_Logo.svg.png';
import Button from '@mui/material/Button';
import './AdminHeader.css';
import {Link, NavLink} from 'react-router-dom';

function AdminHeader() {
  return (
  <header style={{margin:'auto'}}>
        <img src={logo} alt="logo" style={{height:'3rem',width:'5rem',padding:'0 0 0 4rem'}} />
        <section style={{padding:'0 4rem 0 0'}} >
          {/* <Link to="/createproject" style={styles.link}>Create Projects</Link> */}
          <NavLink to="/createproject" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: "0.5em",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Create Projects
          </NavLink>
          {/* <Link to="/editproject" style={styles.link}>Edit Projects</Link> */}
          <NavLink to="/editproject" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: "0.5em",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Edit Projects
          </NavLink>
          <a>Create Work Book</a>
          {/* <Link to="/changepassword" style={styles.link}>Change Password</Link> */}
          <NavLink to="/changepassword" style={({ isActive}) => ({ 
                          textDecoration: isActive ? "underline":"none",
                          textDecorationColor: isActive ? "#191970" :"none",
                          textUnderlineOffset: "0.5em",
                          textDecorationThickness: "3px",
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#191970" : "black",})}>
                          Change Password
          </NavLink>
          <Link to="/" style={{textDecoration: "none",color:'inherit'}}>
            <Button variant="outlined" size="small" sx={{textTransform: "none"}}>Log Out & Back to Home</Button>
          {/*Onclick or Anchor or href=?*/}
          </Link>
        </section>
  </header>
  );
}

export default AdminHeader;