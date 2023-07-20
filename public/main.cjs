const path = require("path");
const { app, BrowserWindow, ipcMain } = require('electron');
const { openFile } = require('./dialogs.cjs');
const { exec_query } = require('./db.cjs');

function createWindow() {
    const win = new BrowserWindow({
        // width: 800,
        // height: 600,
        // titleBarStyle: 'hidden',
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs')
        }
    });

    win.maximize();

    win.show();

    win.loadURL('http://localhost:3000');

    //win.webContents.openDevTools();
}

app.whenReady().then(() => {
    ipcMain.handle('file-open-request', async () => {
        const data = await openFile();
        return data;
    });

    ipcMain.handle('table-columns-request', async (evt, databasePath, tableName) => {
        const data = await exec_query(databasePath, `PRAGMA table_xinfo(${tableName})`);
        return data;
    });

    ipcMain.handle('execute-query', async (evt, databasePath, query) => {
        const data = await exec_query(databasePath, query);
        return data;
    });
    
    createWindow();
});

app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
        app.quit();
    // }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

require('./menu.cjs');
