import React, { useContext } from 'react';
import { BrowserContext } from './BrowserContext.ts';
import BrowserTable from './BrowserTable.tsx';

type Props = {
    databaseName: string;
    tables: { name: string }[];
}

export default function Browser({ databaseName, tables }: Props) {
    const databasePath = useContext(BrowserContext);

    return <>
        <p>File path: {databasePath}</p>
        <p>Name: {databaseName}</p>
        <ul>
            {tables.map(t =>
                <BrowserTable tableName={t.name} />
            )}
        </ul>
    </>
}
