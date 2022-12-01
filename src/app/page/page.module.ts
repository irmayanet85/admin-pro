import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageRoutingModule } from './page-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';

import { PagesComponent } from './pages.component';
import { ShareModule } from '../share/share.module';

import { ProgressComponent } from './progress/progress.component';



@NgModule({
  declarations: [
    PagesComponent,
    ProgressComponent,
    Grafica1Component,
    DashboardComponent

  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule
    
  
  ],
  exports: [

  ]
})
export class PageModule { }
