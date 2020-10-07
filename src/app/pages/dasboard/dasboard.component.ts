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
    private firstImport: number;
    private secondImport: number;

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
     * Filter to name
     * @param event Filter event
     */
    public applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public firstApplyFilterImport(event: Event): void {
        this.firstImport = parseFloat((event.target as HTMLInputElement).value);

        

        this.dataSource._updateChangeSubscription();
    }

    public secondApplyFilterImport(event: Event): void {

    }

    public cleanFilter(): void {
        this.arrayPagares = [...this.dataSourceTotal.data];

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