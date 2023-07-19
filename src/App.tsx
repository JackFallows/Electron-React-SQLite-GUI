import './App.css';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Browser from './Browser.tsx';
import { BrowserContext } from './BrowserContext.ts';

const { ipcRenderer } = window.require('electron');


function App() {
    let [ browser, setBrowser ] = useState<React.JSX.Element>(null);

    function handleOpenedFile(data) {
      setBrowser(
        <>
          <BrowserContext.Provider value={data.path}>
            <Browser databaseName={data.name} tables={data.tables} />
          </BrowserContext.Provider>
        </>
      );
    }

    async function requestOpenFile() {
      const data = await ipcRenderer.invoke('file-open-request');
      handleOpenedFile(data);
    }

    let button = browser != null ? null : <button onClick={requestOpenFile}>Connect to database...</button>

    useEffect(() => {
      ipcRenderer.on('file-open-message', (evt, message) => {
          handleOpenedFile(message);
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
