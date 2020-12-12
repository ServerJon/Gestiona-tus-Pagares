const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { windowsStore } = require('process');

const csvWriter = createCsvWriter({
  path: path.join(__dirname, 'assets/data/pagares.csv'),
  header: [
    {id: 'id', title: 'Id'},
    {id: 'banco', title: 'Banco'},
    {id: 'cliente', title: 'Cliente'},
    {id: 'concepto', title: 'Concepto'},
    {id: 'fecha_entrega', title: 'Fecha_entrega'},
    {id: 'importe', title: 'Importe'},
    {id: 'vencimiento', title: 'Vencimiento'}
  ]
})

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: { nodeIntegration: true, webSecurity: false },
        icon: path.join(
            __dirname,
            '../dist/GestionaTusPagares/favicon.ico'
        ),
    });
    // Fullscreen
    // win = new BrowserWindow({ fullscreen: true });

    // win.loadURL(
    //     url.format({
    //         pathname: path.join(__dirname, '/dist/GestionaTusPagares/index.html'),
    //         protocol: 'file:',
    //         slashes: true
    //     })
    // );

    win.loadURL(`file://${ __dirname }/../dist/index.html`);

    // Open Chrome devTools
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

ipcMain.handle('event-pagares', async (event, args) => {
  let result;

  switch(args[0]){
    case 'load-data':
      result = [];
      await fs.createReadStream(path.join(__dirname, 'assets/data/pagares.csv'))
        .pipe(csv())
        .on('data', (row) => {
          console.log(row);
          result.push(row);
        })
        .on('end', () => {
          console.log('csv file successfully processed');
        });

      return result;
    case 'update-data':
        csvWriter.writeRecords(args[1]).then(
          () => {
            console.log('The CSV file was written successfully')
          }
        );

        break;
  }
})
