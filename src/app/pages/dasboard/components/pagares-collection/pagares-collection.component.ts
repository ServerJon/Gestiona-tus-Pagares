import { Component, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-pagares-collection',
	templateUrl: './pagares-collection.component.html',
	styleUrls: ['./pagares-collection.component.css']
})
export class PagaresCollectionComponent implements AfterViewInit {
	/**
	 * Variables
	 */
	@Input() public dataSource: MatTableDataSource<any>;
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() public onEdit = new EventEmitter<any>();
	public displayedColumns: string[] = [
		'cliente',
		'importe',
		'vencimiento',
		'banco',
		'concepto',
		'fecha_entrega'
	];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor() {}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	public goToPagare(item): void {
		this.onEdit.emit(item);
	}
}
