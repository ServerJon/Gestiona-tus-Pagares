import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagareService {
  /**
   * Variables
   */
  private pagaresCollection: AngularFirestoreCollection<any>;
  public pagares: Observable<any[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.pagaresCollection = afs.collection<any>('pagares');

    this.pagares = this.pagaresCollection.snapshotChanges().pipe(map(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data};
      })
    ))
  }

  public getPagares() {
    return this.pagares;
  }

  public updatePagare(id: string, pagare: any) {
    return this.pagaresCollection.doc(id).update(pagare);
  }

  public deletePagare(id: string) {
    return this.pagaresCollection.doc(id).delete();
  }

  public createPagare(pagare: any) {
    return this.pagaresCollection.add(pagare);
  }
}
