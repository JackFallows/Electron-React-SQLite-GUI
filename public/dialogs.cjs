const { dialog } = require('electron');
const { exec_query } = require('./db.cjs');

async function openFile() {
    const response = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Databases', extensions: ['db'] },
            { name: 'All files', extensions: ['*'] }
        ]
    });

    if (response.canceled) {
        return;
    }

    const dbPath = response.filePaths[0];

    const tables = await exec_query(dbPath, "SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%'");
    
    return { path: dbPath, tables };
}

module.exports = {
    openFile
};
