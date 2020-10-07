import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MatNativeDateModule } from '@angular/material/core';

import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { environmentFirebase } from '../environments/environment.firebase';
import { PagaresCollectionComponent } from './pages/dasboard/components/pagares-collection/pagares-collection.component';
import { ModalFormComponent } from './pages/dasboard/components/modal-form/modal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    AngularFireModule.initializeApp(environmentFirebase.firebaseConfig),
    AngularFireAuthModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
