import React from "react"

export default function Results({ results }: { results: any[] }) {
    const columns = results.length > 0
        ? Object.keys(results[0]).map(c => <th>{c}</th>)
        : null;

    const rows = results.length > 0
        ? results.map(r =>
            <tr>
                {Object.values(r).map((c: string) => <td>{c}</td>)}
            </tr>)
        : null;

    return <table>
        <thead>
            <tr>
                {columns}
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
}
