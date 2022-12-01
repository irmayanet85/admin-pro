import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRoutingModule } from './page/page-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
   //{path: 'login', redirectTo : '/login'},
  { path: '**', component: NopagefoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            PageRoutingModule,
            AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
