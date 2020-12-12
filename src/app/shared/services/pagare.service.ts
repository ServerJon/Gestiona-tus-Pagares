import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ElectronService } from 'ngx-electron';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Pagare } from '../interfaces/pagare';

@Injectable({
  providedIn: 'root'
})
export class PagareService {
  /**
   * Variables
   */
  // private pagaresCollection: AngularFirestoreCollection<any>;
  private pagares: Pagare[];

  // constructor(private readonly afs: AngularFirestore) {
  //   this.pagaresCollection = afs.collection<any>('pagares');

  //   this.pagares = this.pagaresCollection.snapshotChanges().pipe(map(
  //     actions => actions.map(a => {
  //       const data = a.payload.doc.data() as any;
  //       const id = a.payload.doc.id;
  //       return { id, ...data};
  //     })
  //   ))
  // }

  constructor(private _electronService: ElectronService) { }

  public async loadPagares() {

    return await this._electronService.ipcRenderer.invoke('event-pagares', ['load-data']);
  }

  public Pagares(pagares: Pagare[]): void {

    this.pagares = [...pagares];
  }

  public async updatePagare(id: string, pagare: Pagare) {

    this.pagares.forEach((row: Pagare) => {
      if (row.id === id) {
        row = pagare;
      }
    });

    await this._electronService.ipcRenderer.invoke('event-pagares', ['update-data', this.pagares]);
    // return this.pagaresCollection.doc(id).update(pagare);
  }

  public deletePagare(id: string) {
    let i: number;

    this.pagares.forEach((row: Pagare, index) => {
      if (row.id === id) {
        i = index;
      }
    });

    if (i) {
      this.pagares.splice(i, 1);
    }

    this._electronService.ipcRenderer.invoke('event-pagares', ['update-data', this.pagares]);
    // return this.pagaresCollection.doc(id).delete();
  }

  public createPagare(pagare: Pagare) {

    this.pagares.push(pagare);

    this._electronService.ipcRenderer.invoke('event-pagares', ['update-data', this.pagares]);
    // return this.pagaresCollection.add(pagare);
  }
}
