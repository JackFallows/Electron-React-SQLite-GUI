import React, { useContext, useState } from "react";
import { DatabaseContext } from "./DatabaseContext.ts";

type Props = {
    tableName: string;
}

export default function BrowserTable({ tableName }: Props) {
    const databasePath = useContext(DatabaseContext);
    let [ columns, setColumns ] = useState([]);

    async function requestTableColumns() {
        if (columns.length > 0){
            return;
        }

        const columnsData = await window.electronAPI.getTableColumns(databasePath, tableName);

        setColumns(columnsData.map(c => <li key={c.cid}>{c.name}</li>))
    }

    return <li>
        <a href='#' onClick={requestTableColumns}>{tableName}</a>
        <ul>
            {columns}
        </ul>
    </li>
}
