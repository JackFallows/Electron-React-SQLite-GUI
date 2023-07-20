import React from "react";

import Browser from './Browser.tsx';
import Editor from './Editor.tsx';
import { DatabaseContext } from './DatabaseContext.ts';

export default function Database({ databasePath, databaseName, tables }) {
    return <div className="database">
        <DatabaseContext.Provider value={databasePath}>
            <Browser databaseName={databaseName} tables={tables} />

            <Editor />
        </DatabaseContext.Provider>
    </div>
    
}
