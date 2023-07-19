import './App.css';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Browser from './Browser.tsx';

const { ipcRenderer } = window.require('electron');


function App() {
    let [ browser, setBrowser ] = useState<React.JSX.Element>(null);

    function handle_opened_file(data) {
      setBrowser(<Browser database={data.path} tables={data.tables} />)
    }

    async function request_open_file() {
      const data = await ipcRenderer.invoke('file-open-request');
      handle_opened_file(data);
    }

    let button = browser != null ? null : <button onClick={request_open_file}>Connect to database...</button>

    useEffect(() => {
      ipcRenderer.on('file-open-message', (evt, message) => {
          handle_opened_file(message);
      });
    }, []); // empty array of dependencies means the effect will only run on first render

  return (
    <div className="App">
        {button}

        {browser}

        
    </div>
  );
}

export default App;
