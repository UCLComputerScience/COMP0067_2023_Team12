import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import EditProject from './screens/EditProject';
import ProjectsList from "./components/project-list.component";
import AddProject from "./components/add-project.component";



function App() {
  return (
    <main>
      <Header />
      <EditProject />
      <ProjectsList/>
      <AddProject/>
   </main>
 

  )
}
export default App;
