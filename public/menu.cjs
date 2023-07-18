const { app, Menu, dialog } = require('electron');

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
                        filter: [
                            { name: 'Databases', extensions: ['db'] },
                            { name: 'All files', extensions: ['*'] }
                        ]
                     }).then((response) => {
                        if (response.canceled) {
                            return;
                        }

                        // TODO
                        const dbPath = response.filePaths[0];

                        browserWindow.webContents.send('file-open-message', { 'path': dbPath });
                    })
                } }
            ]
        }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
