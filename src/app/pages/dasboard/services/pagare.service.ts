/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	DocumentReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Project files
import { Pagare } from '../interfaces/dasboard.interface';

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

		this.pagares = this.pagaresCollection.snapshotChanges().pipe(
			map((actions) =>
				actions.map((a) => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				})
			)
		);
	}

	public getPagares(): Observable<any[]> {
		return this.pagares;
	}

	public updatePagare(id: string, pagare: Pagare): Promise<void> {
		return this.pagaresCollection.doc(id).update(pagare);
	}

	public deletePagare(id: string): Promise<void> {
		return this.pagaresCollection.doc(id).delete();
	}

	public createPagare(pagare: Pagare): Promise<DocumentReference> {
		return this.pagaresCollection.add(pagare);
	}
}
