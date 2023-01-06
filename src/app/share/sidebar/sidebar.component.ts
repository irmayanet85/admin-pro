import { Component, OnInit } from '@angular/core';
import { Menu, SidebarService } from 'src/app/servicios/tools/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  menu:Menu[] = [];

  constructor( private servsidebar : SidebarService) { 
    this.menu = this.servsidebar.listMenu;
    
  }

  ngOnInit(): void {
  }

}
