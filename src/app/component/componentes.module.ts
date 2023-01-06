import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { CargarImgComponent } from './cargar-img/cargar-img.component';




@NgModule({
  declarations: [
    IncrementadorComponent,
    DoughnutComponent,
    CargarImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DoughnutComponent,
    CargarImgComponent
  ]
})
export class ComponentesModule { }
