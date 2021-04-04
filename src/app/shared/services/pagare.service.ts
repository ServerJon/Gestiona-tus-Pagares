import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class PagareService {
  /**
   * Variables
   */
  private pagares: Observable<any[]>;

  constructor(private _electronService: ElectronService) {
    if (this._electronService.isElectronApp) {
      let result = this._electronService.ipcRenderer.sendSync('csv-pipe-start');

      if (result) {

      }

      this._electronService.ipcRenderer.on('csv-pipe', (event, arg) => {
        console.log(arg)
      })
    }
  }

  public getPagares() {
    return this.pagares;
  }

  // public updatePagare(id: string, pagare: any) {
  //   return this.pagaresCollection.doc(id).update(pagare);
  // }

  // public deletePagare(id: string) {
  //   return this.pagaresCollection.doc(id).delete();
  // }

  // public createPagare(pagare: any) {
  //   return this.pagaresCollection.add(pagare);
  // }
}
