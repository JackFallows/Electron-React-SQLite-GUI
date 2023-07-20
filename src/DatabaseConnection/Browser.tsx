import React from 'react';
import BrowserTable from './BrowserTable.tsx';

type Props = {
    databaseName: string;
    tables: { name: string }[];
}

export default function Browser({ databaseName, tables }: Props) {
    return <>
        <p>Name: {databaseName}</p>
        <ul>
            {tables.map(t =>
                <BrowserTable tableName={t.name} />
            )}
        </ul>
    </>
}
