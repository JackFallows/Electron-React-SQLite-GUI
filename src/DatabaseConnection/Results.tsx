import React from "react"

export default function Results({ results, message, success }: { results?: any[], message: string, success: boolean }) {
    const columns = results?.length > 0
        ? Object.keys(results[0]).map((c, i) => <th key={'header-column-' + i}>{c}</th>)
        : null;

    const rows = results?.length > 0
        ? results.map((r, i) =>
            <tr key={'results-row-' + i}>
                {Object.values(r).map((c: string, x: number) => <td key={'results-column-' + x}>{c}</td>)}
            </tr>)
        : null;

    return <div className="results">
        <b>Results</b><br />
        <span>{results?.length ?? 0} rows</span><br />
        <span className={(success ? 'success' : 'error')}>{message}</span>
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
    </div>
}
