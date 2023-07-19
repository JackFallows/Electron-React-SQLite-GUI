import React from 'react';

type Props = {
    database: string;
    tables: { name: string }[];
}

export default function Browser({ database, tables }: Props) {
    return <>
        <p>File path: {database}</p>
        <ul>
            {tables.map(t => <li>{t.name}</li>)}
        </ul>
    </>
}
