import './App.css';
// Different Page Views
import CreateNewProject from './components/CreateNewProject'
import HomePage from './components/HomePage'
import IndividualProjectPage from './components/IndividualProjectPage'
import About from './components/About'
import ProjectList from './screens/ProjectList'
import EditProject from './screens/EditProject'
import ForgotPassword from './screens/ForgotPassword';
import Sign_In from './screens/Sign_In'
// import Sign_In from './screens/Register'
import ChangePassword from './screens/Change_Password';
import ResetPassword from './screens/Reset_Password';
// Different Page Views End
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/projects" element={<ProjectList />} />
    <Route path="/projects/:id" element={<IndividualProjectPage />} />
    <Route path="/about" element={<About />}/>
    <Route path="/createproject" element={<CreateNewProject />} />
    <Route path="/editproject" element={<EditProject />} />
    <Route path="/signin" element={<Sign_In />} />
    <Route path="/changepassword" element={<ChangePassword />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/resetpassword/:user/:token" element={<ResetPassword />} />
  </Routes>
    // <div className="App">
    //   {/*<CreateNewProject />*/}
    //   {/* <HomePage /> */}
    //   {/* <IndividualProjectPage /> */}
    //   {/* <About /> */}
    // </div>
  );
}

export default App;

// function OriginalApp() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

