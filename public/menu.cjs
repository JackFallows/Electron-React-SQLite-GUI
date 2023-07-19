const { app, Menu, dialog } = require('electron');
const { exec_query } = require('./db.cjs');

const isMac = process.platform === 'darwin';

const template = [
    ...(isMac
        ? [{
            label: app.name,
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'reload' },
                { role: 'quit' }
            ]
        }]
        : []),
        {
            label: 'File',
            submenu: [
                { label: 'Open', accelerator: 'CommandOrControl+O', click: (menuItem, browserWindow, event) => {
                    dialog.showOpenDialog({
                        properties: ['openFile'],
                        filters: [
                            { name: 'Databases', extensions: ['db'] },
                            { name: 'All files', extensions: ['*'] }
                        ]
                     }).then((response) => {
                        if (response.canceled) {
                            return;
                        }

                        const dbPath = response.filePaths[0];

                        exec_query(dbPath, "SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%'").then(tables => {
                            browserWindow.webContents.send('file-open-message', { path: dbPath, tables });
                        });
                    });
                } }
            ]
        }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
