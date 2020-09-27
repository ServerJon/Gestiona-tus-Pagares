import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DasboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
