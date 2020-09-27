import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dasboard',
    component: DasboardComponent,
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: '/dasboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dasboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
