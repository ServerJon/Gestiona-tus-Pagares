import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { DialogData } from '../../interfaces/dasboard.interface';
import { PagareService } from '../../../../shared/services/pagare.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  /**
   * Variables
   */
  public pagareForm: FormGroup;
  public message: string;
  public errorMessage: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private pagareService: PagareService) {
      this.errorMessage = false;
      this.message = '';
  }

  ngOnInit(): void {

    this.loadForm();

  }

  private loadForm(): void {
    if (this.data.editOrCreate) {
      this.pagareForm = this.formBuilder.group({
        cliente: [this.data.pagare.cliente, Validators.required],
        importe: [this.data.pagare.importe, Validators.required],
        vencimiento: [this.getDate(this.data.pagare.vencimiento.seconds), Validators.required],
        banco: [this.data.pagare.banco, Validators.required],
        concepto: [this.data.pagare.concepto],
        fecha_entrega: [this.getDate(this.data.pagare.fecha_entrega.seconds), Validators.required]
      });
    } else {
      this.pagareForm = this.formBuilder.group({
        cliente: [null, Validators.required],
        importe: [null, Validators.required],
        vencimiento: [null, Validators.required],
        banco: [null, Validators.required],
        concepto: [null],
        fecha_entrega: [null, Validators.required]
      });
    }
  }

  private getDate(seconds: number): Date {
    const t = new Date(1970, 0, 2);
    t.setSeconds(seconds);

    return t;
  }

  public onSubmit(): void {
    if (this.pagareForm.valid) {
      if (this.data.editOrCreate) {
        this.pagareService.updatePagare(this.data.pagare.id, this.pagareForm.value);
      } else {
        this.pagareService.createPagare(this.pagareForm.value);
      }

      this.pagareForm.reset();
    }
  }

  public delete(): void {
    this.pagareService.deletePagare(this.data.pagare.id);
  }

}
