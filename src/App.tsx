import './App.css';
import React, { useState } from 'react';
import logo from './logo.svg';

const { ipcRenderer } = window.require('electron');


function App() {
    let [ filePath, setFilePath ] = useState(null);

    ipcRenderer.on('file-open-message', (evt, message) => {
        setFilePath(message.path);
    })

  return (
    <div className="App">
      {/* <div className="title-bar">
        SQLite GUI
      </div> */}
      <header className="App-header">
        <img src={logo as unknown as string} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>File path: {filePath ?? "unset"}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
