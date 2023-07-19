const { app, Menu, dialog } = require('electron');
const { openFile } = require('./dialogs.cjs');

const isMac = process.platform === 'darwin';

const toolsMenu = {
    label: isMac ? app.name : 'Tools',
    submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'quit' }
    ]
};

const template = [
    ...(isMac ? [toolsMenu] : []),
    {
        label: 'File',
        submenu: [
            {
                label: 'Connect', accelerator: 'CommandOrControl+O', click: async (menuItem, browserWindow, event) => {
                    const data = await openFile(browserWindow);
                    
                    browserWindow.webContents.send('file-open-message', data);
                }
            }
        ]
    },
    ...(isMac ? [] : [toolsMenu]),
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
