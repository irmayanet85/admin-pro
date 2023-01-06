import { Component, OnInit } from '@angular/core';
import { AccountSettingService } from '../servicios/tools/account-setting.service';
declare function customInitFunction():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  //theme = localStorage.getItem('theme');
  constructor( private servestabletheme : AccountSettingService) { }

  ngOnInit(): void {
    customInitFunction();
    this.servestabletheme.stabletheme();
  

  }

}
