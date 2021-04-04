import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron'

import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { PagaresCollectionComponent } from './pages/dasboard/components/pagares-collection/pagares-collection.component';
import { ModalFormComponent } from './pages/dasboard/components/modal-form/modal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DasboardComponent,
    PagaresCollectionComponent,
    ModalFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
