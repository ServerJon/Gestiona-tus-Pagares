import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { LoginService } from '../../shared/services/login.service';
import { PagareService } from '../../shared/services/pagare.service';
import { ModalFormComponent } from './components/modal-form/modal-form.component';

@Component({
    selector: 'app-dasboard',
    templateUrl: 'dasboard.component.html',
    styleUrls: ['dasboard.component.css']
})

export class DasboardComponent implements OnInit {
    /**
     * Variables
     */
    public dataSource: MatTableDataSource<any>;
    public dataSourceTotal: MatTableDataSource<any>;
    private arrayPagares: Array<any>;
    private textFilter: string;
    private bankFilter: string;
    private minImport: string;
    private maxImport: string;
    private minDate: string;
    private maxDate: string;

    constructor(
        private loginService: LoginService,
        private router: Router,
        private pagareService: PagareService,
        private dialog: MatDialog) {
            this.arrayPagares = [];
            this.dataSource = new MatTableDataSource();
            this.dataSourceTotal = new MatTableDataSource();
    }

    ngOnInit() {
        this.loadPagares();

        this.dataSource.filterPredicate = this.getFilterPredicate();
    }

    /**
     * Load all pagares
     */
    private loadPagares(): void {
        this.pagareService.getPagares().subscribe(
            response => {
                this.arrayPagares = [...response];

                this.dataSource.data = this.arrayPagares;
                this.dataSourceTotal.data = response;
            },
            error => {
                console.error('Error loadPagares() | Dasboard Component: ', error);
            }
        );
    }

    /**
     * Filter function
     */
    public applyFilter(): void {
        const t: string = (document.getElementById('textFilter') as HTMLInputElement).value;
        const minI: string = (document.getElementById('minImport') as HTMLInputElement).value;
        const maxI: string = (document.getElementById('maxImport') as HTMLInputElement).value;
        const b: string = (document.getElementById('bankFilter') as HTMLInputElement).value;
        const minD: string = (document.getElementById('minDate') as HTMLInputElement).value;
        // const maxD: string = (document.getElementById('maxDate') as HTMLInputElement).value;

        this.textFilter = t === null ? '' : t;
        this.minImport = minI === null ? '' : minI;
        this.maxImport = maxI === null ? '' : maxI;
        this.bankFilter = b === null ? '' : b;
        this.minDate = minD === null ? '' : minD;
        // this.maxDate = maxD === null ? '' : maxD;

        // tslint:disable-next-line: max-line-length
        const filterValue = `${this.textFilter}$${this.minImport}$${this.maxImport}$${this.bankFilter}$${this.minDate}`;

        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    /**
     * Custom Filter Predicate
     */
    private getFilterPredicate() {
        return (row, filters: string) => {
            const filterArray = filters.split('$');
            const t = filterArray[0];
            const minI = filterArray[1];
            const maxI = filterArray[2];
            const b = filterArray[3];
            const minD = filterArray[4];
            // const maxD = filterArray[5];

            const matchFilter = [];

            const columnCliente = row.cliente;
            const columnBanco = row.banco;
            const columnImporte = row.importe;
            const columnVencimiento = parseFloat(row.vencimiento.seconds) * 1000;

            const customFilterCliente = columnCliente.toLowerCase().includes(t);
            const customFilterBanco = columnBanco.toLowerCase().includes(b);
            const customFilterImporte = this.customFilterImporte(parseFloat(columnImporte), parseFloat(minI), parseFloat(maxI));
            const customFilterVencimiento = this.customFilterVencimiento(columnVencimiento, Date.parse(minD), NaN);

            matchFilter.push(customFilterCliente);
            matchFilter.push(customFilterBanco);
            matchFilter.push(customFilterImporte);
            matchFilter.push(customFilterVencimiento);

            return matchFilter.every(Boolean);
        };
    }

    /**
     * Filter the vencimiento between min and max value
     * @param vencimiento Vencimiento value
     * @param minD Min vencimiento value
     * @param maxD Max vencimiento value
     */
    private customFilterVencimiento(vencimiento: number, minD: number, maxD: number): boolean {
        // tslint:disable-next-line: no-inferrable-types
        let result: boolean = true;

        if (Number.isNaN(minD) && Number.isNaN(maxD)) {
            result = true;
        } else if (Number.isNaN(maxD) && !Number.isNaN(minD)) {
            if (vencimiento >= minD) {
                result = true;
            } else {
                result = false;
            }
        } else if (!Number.isNaN(maxD) && Number.isNaN(minD)) {
            if (vencimiento <= maxD) {
                result = true;
            } else {
                result = false;
            }
        } else if (Number.isNaN(maxD) && Number.isNaN(minD)) {
            if (vencimiento >= minD && vencimiento <= maxD) {
                result = true;
            } else {
                result = false;
            }
        }

        return result;
    }

    /**
     * Filter the import between min and max value
     * @param importe Importe value
     * @param fI Min import value
     * @param sI Max import value
     */
    private customFilterImporte(importe: number, minI: number, maxI: number): boolean {
        // tslint:disable-next-line: no-inferrable-types
        let result: boolean = true;

        if (Number.isNaN(minI) && Number.isNaN(maxI)) {
            result = true;
        } else if (Number.isNaN(maxI) && !Number.isNaN(minI)) {
            if (importe >= minI) {
                result = true;
            } else {
                result = false;
            }
        } else if (!Number.isNaN(maxI) && Number.isNaN(minI)) {
            if (importe <= maxI) {
                result = true;
            } else {
                result = false;
            }
        } else if (!Number.isNaN(maxI) && !Number.isNaN(minI)) {
            if (importe >= minI && importe <= maxI) {
                result = true;
            } else {
                result = false;
            }
        }

        return result;
    }

    /**
     * Clean the dataSource table and show all again
     */
    public cleanFilter(): void {

        (document.getElementById('textFilter') as HTMLInputElement).value = '';
        (document.getElementById('minImport') as HTMLInputElement).value = '';
        (document.getElementById('maxImport') as HTMLInputElement).value = '';
        (document.getElementById('bankFilter') as HTMLInputElement).value = '';
        (document.getElementById('minDate') as HTMLInputElement).value = '';
        // (document.getElementById('maxDate') as HTMLInputElement).value = '';

        this.dataSource.filter = ''.trim().toLowerCase();
        this.dataSource._updateChangeSubscription();
    }

    /**
     * Open modal dialog to create or edit a pagare
     * @param pagare Pagare item
     */
    public openModal(pagare?): void {
        let dataToSend = {};

        if (pagare) {
            dataToSend = {
                title: `Editar ${pagare.cliente}`,
                editOrCreate: true,
                pagare
            };
        } else {
            dataToSend = {
                title: 'Crear nuevo Pagare',
                editOrCreate: false
            };
        }

        const dialogRef = this.dialog.open(ModalFormComponent, {
            data: dataToSend
        });
    }

    /**
     * Logout query
     */
    public logout(): void {
        this.loginService.logout();

        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 1000);
    }
}
