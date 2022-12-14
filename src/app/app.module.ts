import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PageModule } from './page/page.module';
import { AuthModule } from './auth/auth.module';
import { IncrementadorComponent } from './component/incrementador/incrementador.component';
import { ComponentesModule } from './component/componentes.module';
import { PendingChangesGuardGuard } from './guard/pending-changes-guard.guard';



@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageModule,
    AuthModule
  ],
  providers: [PendingChangesGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
