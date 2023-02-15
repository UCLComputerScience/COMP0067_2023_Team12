import logo from './logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Header from './Header';
import Search from './Search';
import './App.css';

const sections = [
  { title: 'Create Projects', url: '#' },
  { title: 'Edit Projects', url: '#' },
  { title: 'Create Workbook', url: '#' },
  { title: 'Log Out & Back To Home', url: '#' },
];


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload. no thank you.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Header title="Blog" sections={sections} />

      <div className='App-search_bar'>
        <Search title="Blog" />
      </div>

      <div className='App-search_bar'>
        {/* <a class="active" href="#home">Home</a> */}
        {/* <a href="#about">About</a> */}
        {/* <a href="#contact">Contact</a> */}
        <div class="search-container">
          <form action="/action_page.php">
            <input class='App-search_bar input' type="text" placeholder="Search.." name="search"/>
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>

        <select class="App-category_dropdown" data-style="btn-info" name="selectpicker">
          <optgroup label="Select Table">
              <option name="" value="0">Select table</option>
              <option name="table1" value="1">Table 1</option>
              <option name="table2" value="2">Table 2</option>
              <option name="table3" value="3">Table 3</option>
            </optgroup>
        </select>

      </div>

      <div className='App-button_bar'>
        <Button variant="contained">Edit</Button>
        {/* <button class="edit_workbook_button" type="button">Edit</button> */}
        {/* <button class="edit_workbook_button" type="button">Delete</button> */}
        {/* <button class="edit_workbook_button" type="button">Create Workbook</button> */}
      </div>


    </div>
  );
}

export default App;



// I am editing the search bar and buttons on the admin edit projects page
