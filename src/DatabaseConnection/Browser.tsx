import React from 'react';
import BrowserTable from './BrowserTable.tsx';

type Props = {
    databaseName: string;
    tables: { name: string }[];
}

export default function Browser({ databaseName, tables }: Props) {
    return <div className='browser'>
        <p>Name: {databaseName}</p>
        <ul>
            {tables.map(t =>
                <BrowserTable key={t.name} tableName={t.name} />
            )}
        </ul>
    </div>
}
