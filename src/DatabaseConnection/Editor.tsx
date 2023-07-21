import React, { useRef, useState, useContext ,useEffect } from "react";
import { DatabaseContext } from "./DatabaseContext.ts";

import Results from "./Results.tsx";

export default function Editor() {
    const contentEditableRef = useRef(null);
    let [ results, setResults ] = useState<React.JSX.Element>(null);
    const databasePath = useContext(DatabaseContext);

    async function execute_query() {
        const query: string = contentEditableRef.current.innerText?.trim();
        
        if (query == null) {
            return;
        }

        const results = await window.electronAPI.executeQuery(databasePath, query);

        setResults(
            <div className="results">
                <Results results={results} />
            </div>
          );
    }

    useEffect(() => {
        window.electronAPI.handleRunQuery(() => execute_query());
    }, []);
    
    return <div className="editor">
        <div className="query">
            {/* <button onClick={execute_query}>Execute</button> */}
            <pre style={{"border": "1px solid black"}} contentEditable ref={contentEditableRef}></pre>
        </div>
        {results}
    </div>
}
