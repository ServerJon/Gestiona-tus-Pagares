const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvPath = path.join(__dirname, './assets/pagares.csv')
const csvWriter = createCsvWriter({
  path: csvPath,
  header: [
    {id: 'id', title: 'id'},
    {id: 'cliente', title: 'cliente'},
    {id: 'importe', title: 'importe'},
    {id: 'vencimiento', title: 'vencimiento'},
    {id: 'banco', title: 'banco'},
    {id: 'concepto', title: 'concepto'},
    {id: 'fecha_entrega', title: 'fecha_entrega'}
  ],
  fieldDelimiter: ';'
})

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
    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });

    ipcMain.on('csv-pipe-start', (event, arg) => {

      let pagares = [];

      fs.createReadStream(csvPath)
        .pipe(csv({separator: ';'}))
        .on('data', (row) => {
          pagares.push(row)

        })
        .on('error', (error) => {
          console.log('Error al leer el csv: ', error);
        })
        .on('end', () => {
          console.log("Csv cargado correctamente");

          if (pagares.length > 0) {
            event.returnValue = {code: true, pagares: pagares};
          } else {
            event.returnValue = {code: false, pagares: pagares};
          }
        });
    });

    ipcMain.on('csv-pipe-write', (event, arg) => {

      csvWriter.writeRecords(arg).then(() => {
        event.returnValue = {code: true, pagares: arg}
      });
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
