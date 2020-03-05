import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';
import EmailForm from "./tddExample/EmailForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Welcome name="Mario"/>
        <EmailForm />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pepe
        </a>
      </header>
    </div>
  );
}

export default App;
