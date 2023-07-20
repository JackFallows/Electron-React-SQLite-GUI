import './App.css';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';

import Database from './Database.tsx';

const { ipcRenderer } = window.require('electron');


function App() {
    let [ database, setDatabase ] = useState<React.JSX.Element>(null);

    function handleOpenedFile(data) {
      setDatabase(
        <Database databasePath={data.path} databaseName={data.name} tables={data.tables} />
      );
    }

    async function requestOpenFile() {
      const data = await ipcRenderer.invoke('file-open-request');
      handleOpenedFile(data);
    }

    let button = database == null && <button onClick={requestOpenFile}>Connect to database...</button>

    useEffect(() => {
      ipcRenderer.on('file-open-message', (evt, message) => {
          handleOpenedFile(message);
      });
    }, []); // empty array of dependencies means the effect will only run on first render

  return (
    <div className="App">
        {button}

        {database}
    </div>
  );
}

export default App;
