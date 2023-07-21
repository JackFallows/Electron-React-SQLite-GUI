export interface IFileData {
    path: string;
    name: string;
    tables: { name: string }[]
}

export interface IColumnData {
    cid: number;
    name: string;
    type: string;
    notnull: number;
    dflt_value: string;
    pk: number;
}

export interface IElectronAPI {
    handleOpenedFile: (callback: (evt, message) => void) => void;
    handleRunQuery: (callback: (evt, message) => void) => void;
    openFile: () => Promise<IFileData>;
    getTableColumns: (dbPath: string, table: string) => Promise<IColumnData[]>;
    executeQuery: (dbPath: string, query: string) => Promise<any[]>;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}
