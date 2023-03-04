import './App.css';
// Different Page Views
import CreateNewProject from './components/CreateNewProject'
import HomePage from './components/HomePage'
import IndividualProjectPage from './components/IndividualProjectPage'
import About from './components/About'
// Different Page Views End

function App() {
  return (
    <div className="App">
      {/*<CreateNewProject />*/}
      {/* <HomePage /> */}
      {/* <IndividualProjectPage /> */}
      <About />
    </div>
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

