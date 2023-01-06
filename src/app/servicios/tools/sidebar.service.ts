import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

export  interface Menu 
  {
    title : string,
    icono : string,
    submenu : Item[]
   }

   export interface Item {
    
      name: string, 
      link: string,

   }


@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private genericMenu:Menu[]= [
    {
      title : "Principal",
      icono : "mdi mdi-gauge",
      submenu : [
        {
          name: "Grafica", 
          link: "grafica1" 
        },
        {
          name: "Progress", 
          link: "progress" 
        },
        {
          name: "Dashboard", 
          link: "/" 
        },
        {
          name: "Promesas", 
          link: "promesas" 
        },
        {
          name: "RXJS", 
          link: "rxjs-page" 
        }

      ]
     },
     {
      title : "Gestion",
      icono : "mdi mdi-folder-lock-open",
      submenu : [
        {
          name: "Hospitales", 
          link: "hospitals" 
        },
        {
          name: "Medicos", 
          link: "doctors" 
        },
        // {
        //   name: "Usuarios", 
        //   link: "users" 
        // }
      ]
     }

  ];
  

  get listMenu(): Menu[]{
    if(this.sergauth.user.rol == environment.role.admin)
    {   
        this.genericMenu[1].submenu.push(
          {
          name: "Usuarios", 
          link: "users" 
          }
        )
        return this.genericMenu;
    }
    else
    {     return this.genericMenu;
    }
    return this.genericMenu;

  }

  constructor( private sergauth : AuthService) {
      
   }
}
