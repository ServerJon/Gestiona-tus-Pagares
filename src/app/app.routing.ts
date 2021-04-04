import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DasboardComponent } from './pages/dasboard/dasboard.component';

const routes: Routes = [
  {
    path: 'dasboard',
    component: DasboardComponent
  },

  { path: '', redirectTo: '/dasboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dasboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
