import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { Grafica1Component } from './page/grafica1/grafica1.component';
import { ProgressComponent } from './page/progress/progress.component';
import { NopagefoundComponent } from './page/nopagefound/nopagefound.component';
import { PagesComponent } from './page/pages.component';


const routes: Routes = [
  {
    path: '' ,
    component: PagesComponent,
    children: [
      {path: 'grafica1', component: Grafica1Component},     
      {path: 'dashboard', component: DashboardComponent},
      {path: 'progress ', component: ProgressComponent}, 
      
      {path: '', redirectTo: '/dashboard', pathMatch : 'full'},
    ]

  },

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NopagefoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
