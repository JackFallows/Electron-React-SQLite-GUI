const { app, BrowserWindow, ipcMain } = require('electron');
const { openFile } = require('./dialogs.cjs');

function createWindow() {
    const win = new BrowserWindow({
        // width: 800,
        // height: 600,
        // titleBarStyle: 'hidden',
        show: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
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
