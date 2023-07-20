import React, { useRef, useState, useContext } from "react";
import { DatabaseContext } from "./DatabaseContext.ts";

import Results from "./Results.tsx";

const { ipcRenderer } = window.require('electron');

export default function Editor() {
    const contentEditableRef = useRef(null);
    let [ results, setResults ] = useState<React.JSX.Element>(null);
    const databasePath = useContext(DatabaseContext);

    async function execute_query() {
        const query: string = contentEditableRef.current.innerText?.trim();
        
        if (query == null) {
            return;
        }

        const results = await ipcRenderer.invoke('execute-query', databasePath, query);

        setResults(
            <>
                <Results results={results} />
            </>
          );
    }
    
    return <>
        <button onClick={execute_query}>Execute</button>
        <div style={{"border": "1px solid black"}} contentEditable ref={contentEditableRef}></div>
        {results}
    </>
}
