import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import EditProject from './screens/EditProject';
import ProjectsList from "./components/projects_list.component";
import AddProject from "./components/add_project.component";
import ProjectList from './components/infinite_scroll_project_list';
import ProjectList from './screens/ProjectList';




function App() {
  return (
    <main>
      <Header />
      <ProjectList />
      <ProjectsList/>
      <AddProject/>
      <ProjectList />
   </main>
 

  )
}
export default App;
