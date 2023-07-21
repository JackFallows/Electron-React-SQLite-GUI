import React from "react"

export default function Results({ results }: { results: any[] }) {
    const columns = results.length > 0
        ? Object.keys(results[0]).map((c, i) => <th key={'header-column-' + i}>{c}</th>)
        : null;

    const rows = results.length > 0
        ? results.map((r, i) =>
            <tr key={'results-row-' + i}>
                {Object.values(r).map((c: string, x: number) => <td key={'results-column-' + x}>{c}</td>)}
            </tr>)
        : null;

    return <>
    <b>Results</b>
    <div className="fixTableHead">
        <table>
            <thead>
                <tr>
                    {columns}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    </div>
    </>
}
