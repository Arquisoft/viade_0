import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';
import EmailForm from "./tddExample/EmailForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Welcome name="ASW students"/>
        <EmailForm />
        <a className="App-link"
          href="https://github.com/arquisoft/viade_0"
          target="_blank"
          rel="noopener noreferrer"
        >Source code</a>
      </header>
    </div>
  );
}

export default App;
