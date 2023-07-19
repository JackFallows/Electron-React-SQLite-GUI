import './App.css';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';

const { ipcRenderer } = window.require('electron');


function App() {
    let [ filePath, setFilePath ] = useState<string>(null);
    let [ tables, setTables ] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
      ipcRenderer.on('file-open-message', (evt, message) => {
          setFilePath(message.path);
          setTables((message.tables as { name: string }[]).map((t) => <li>{t.name}</li>));
      });
    }, []); // empty array of dependencies means the effect will only run on first render

  return (
    <div className="App">

        <p>File path: {filePath ?? "unset"}</p>
        <ul>
            {tables}
        </ul>
        
    </div>
  );
}

export default App;
