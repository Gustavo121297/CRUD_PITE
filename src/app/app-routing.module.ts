import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: 'Inicio',
    component: HomeComponent
  },
  {path: '', redirectTo: 'Inicio', pathMatch: 'full'},
        {path: '**', redirectTo: 'Inicio', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
