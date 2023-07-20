const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    handleOpenedFile(callback) {
        ipcRenderer.on('file-open-message', callback)
    },
    openFile() {
        return ipcRenderer.invoke('file-open-request');
    },
    getTableColumns(db, table) {
        return ipcRenderer.invoke('table-columns-request', db, table);
    },
    executeQuery(db, query) {
        return ipcRenderer.invoke('execute-query', db, query);
    }
});
