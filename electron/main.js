const {app, BrowserWindow} = require('electron') 
const path = require('path')
const url = require('url')

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: { webSecurity: false, nodeIntegration: true },
        icon: path.join(
            __dirname,
            '../dist/GestionaTusPagares/favicon.ico'
        ),
    });
    // Fullscreen
    // win = new BrowserWindow({ fullscreen: true });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, '../dist/GestionaTusPagares/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    // Open Chrome devTools
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
