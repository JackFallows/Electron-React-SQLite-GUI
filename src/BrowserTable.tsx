import React, { useContext, useState } from "react";
import { BrowserContext } from "./BrowserContext.ts";

const { ipcRenderer } = window.require('electron');

type Props = {
    tableName: string;
}

type ColumnData = {
    cid: number;
    name: string;
    type: string;
    notnull: number;
    dflt_value: string;
    pk: number;
}

export default function BrowserTable({ tableName }: Props) {
    const databasePath = useContext(BrowserContext);
    let [ columns, setColumns ] = useState([]);

    async function requestTableColumns() {
        if (columns.length > 0){
            return;
        }

        const columnsData: ColumnData[] = await ipcRenderer.invoke('table-columns-request', databasePath, tableName);

        setColumns(columnsData.map(c => <li>{c.name}</li>))
    }

    return <li>
        <a href='#' onClick={requestTableColumns}>{tableName}</a>
        <ul>
            {columns}
        </ul>
    </li>
}
