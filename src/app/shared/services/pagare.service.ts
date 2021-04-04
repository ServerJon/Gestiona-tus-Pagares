import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElectronService } from 'ngx-electron';

import { IpcData, Pagare } from '../interfaces/pagare.interface';

@Injectable({
  providedIn: 'root'
})
export class PagareService {
  /**
   * Variables
   */
  private pagares: Pagare[];

  constructor(private _electronService: ElectronService) {
    if (this._electronService.isElectronApp) {
      let result: IpcData = this._electronService.ipcRenderer.sendSync('csv-pipe-start');

      this.pagares = [...result.pagares];
    }
  }

  public getPagares(): Observable<Pagare[]> {

    return of(this.pagares);
  }

  public updatePagare(id: string, pagare: Pagare): Observable<Pagare[]> {

    let indexPagare: number = this.getIndexPagare(id);
    let result: IpcData;

    if (indexPagare != -1) {
      this.pagares[indexPagare] = pagare;
    }

    result = this._electronService.ipcRenderer.sendSync('csv-pipe-write', this.pagares);

    if (result.code) {
      this.pagares = [...result.pagares]
    }

    return of(this.pagares);
  }

  public deletePagare(id: string): Observable<Pagare[]> {

    let indexPagare: number = this.getIndexPagare(id);
    let result: IpcData;

    if (indexPagare != -1) {
      this.pagares.splice(indexPagare, 1);
    }

    result = this._electronService.ipcRenderer.sendSync('csv-pipe-write', this.pagares);

    if (result.code) {
      this.pagares = [...result.pagares]
    }

    return of(this.pagares);
  }

  public createPagare(pagare: Pagare): Observable<Pagare[]> {

    let result: IpcData;

    this.pagares.push(pagare);
    result = this._electronService.ipcRenderer.sendSync('csv-pipe-write', this.pagares);

    if (result.code) {
      this.pagares = [...result.pagares]
    }

    return of(this.pagares);
  }

  private getIndexPagare(id: string): number {

    let result: number = -1;

    this.pagares.forEach((pagare, index) => {
      if (pagare.id == id) {
        result = index;
      }
    });

    return result;
  }
}
