import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// Project files
import { DialogData, Pagare } from '../../interfaces/dasboard.interface';

@Component({
	selector: 'app-pagares-collection',
	templateUrl: './pagares-collection.component.html',
	styleUrls: ['./pagares-collection.component.css']
})
export class PagaresCollectionComponent implements AfterViewInit {
	/**
	 * Variables
	 */
	@Input() public dataSource: MatTableDataSource<DialogData>;
	@Output() public eventEdit = new EventEmitter<Pagare>();
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

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	public goToPagare(item: Pagare): void {
		this.eventEdit.emit(item);
	}
}
