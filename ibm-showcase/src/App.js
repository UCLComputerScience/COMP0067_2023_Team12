import './App.css';
// Different Page Views
import CreateNewProject from './screens/CreateNewProject'
import EditNewProject from './screens/EditNewProject'
import HomePage from './screens/HomePage'
import IndividualProjectPage from './screens/IndividualProjectPage'
import About from './screens/About'
import ProjectList from './screens/ProjectList'
import EditProject from './screens/EditProject'
import ForgotPassword from './screens/ForgotPassword';
import SignIn from './screens/SignIn'
// import Sign_In from './screens/Register'
import LearningPath from './screens/LearningPath'
import PrivateRoute from './components/PrivateRoute';
import ChangePassword from './screens/Change_Password';
import ResetPassword from './screens/Reset_Password';
import EditAbout from './screens/EditAbout'
// Different Page Views End
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/projects" element={<ProjectList />} />
    <Route path="/projects/:id" element={<IndividualProjectPage />} />
    <Route path="/about" element={<About />}/>
    <Route path="/learn" element={<LearningPath />}/>
    <Route element={<PrivateRoute/>}>
      <Route path="/createproject" element={<CreateNewProject />} />
    </Route>
    <Route element={<PrivateRoute/>}>
      <Route path="/editproject/:id" element={<EditNewProject />} />
    </Route>
    <Route element={<PrivateRoute/>}>
      <Route path="/editproject" element={<EditProject />} />
    </Route>
    <Route path="/signin" element={<SignIn />} />
    <Route element={<PrivateRoute/>}>
      <Route path="/changepassword"element={<ChangePassword />} />
    </Route>
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/resetpassword/:user/:token" element={<ResetPassword />} />
    <Route element={<PrivateRoute/>}>
      <Route path="/editabout"element={<EditAbout />} />
    </Route>
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

