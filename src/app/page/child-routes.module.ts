import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard } from '../guard/admin.guard';
import { AuthGuard } from '../guard/auth.guard';
import { PendingChangesGuardGuard } from '../guard/pending-changes-guard.guard';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { RouterModule, Routes } from '@angular/router';

const childRoutes : Routes = [
  { path: '', component: DashboardComponent , data: {title: 'Dashboard'}},
  { path: 'progress', component: ProgressComponent , data: {title: 'Progress'}},
  { path: 'grafica1', component: Grafica1Component , data: {title: 'Grafica #1'}},
  { path: 'account', component: AccountSettingComponent , data: {title: 'Account setting'}},
  { path: 'promesas', component: PromesasComponent , data: {title: 'Promesas'}},
  { path: 'rxjs-page', component: RxjsComponent , data: {title: 'RxJS'}},
  { path: 'profile', component: ProfileComponent, canDeactivate: [PendingChangesGuardGuard] , data: {title: 'Perfil'}},

  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'users', component: UsersComponent , canActivate: [AdminGuard], data: {title: 'Gestion Usuarios'}},
  { path: 'hospitals', component: HospitalsComponent , canActivate: [AdminGuard], data: {title: 'Gestion de Hospitales'}},
  { path: 'doctors', component: DoctorsComponent , canActivate: [AdminGuard], data: {title: 'Gestion de doctores'}},
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
