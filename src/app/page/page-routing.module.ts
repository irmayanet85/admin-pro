import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
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

const routes: Routes = 
[{ 
    path: 'dashboard', 
    component: PagesComponent,
    canLoad:[AuthGuard],
    canActivate: [AuthGuard],
    loadChildren:()=> import('./child-routes.module').then(m => m.ChildRoutesModule)
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
