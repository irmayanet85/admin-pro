import { Component, OnInit } from '@angular/core';
import { AccountSettingService } from 'src/app/servicios/tools/account-setting.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent  {



  constructor( private servaccountsetting : AccountSettingService) { }


  change(theme : string ){

    this.servaccountsetting.change(theme);
  
  }

  

}
