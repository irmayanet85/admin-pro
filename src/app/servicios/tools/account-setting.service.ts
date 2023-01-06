import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingService {

  element!:Element;
  workingnow!:Element;
  colorselected!:Element;
  theme = localStorage.getItem('theme');

  stabletheme(){
     
    if(this.theme){
      const element = document.querySelector("#theme");
      const url: string = `./assets/css/colors/${this.theme}.css`;
      element?.setAttribute('href', url );
    }
  }

  findElement(theme : string ){

    //obteniendo el elemento principal para cambiar el tema
    this.colorselected = document.querySelector(`#${theme}`)!;
    this.element = document.querySelector("#theme")!;
    
    //obteniendo el elemento que esta marcado actualmente
    this.workingnow = document.querySelector(`.working`)!;

    //url con la que voy a actualizar
    const url: string = `./assets/css/colors/${theme}.css`;

    //remuevo el seleccionado
    if(this.workingnow){
      this.workingnow?.classList.remove('working');
    }
    
    //introduzco la clasee al elemento global
    this.element?.setAttribute('href', url );
    
    //marco el seleccionado
    this.colorselected?.classList.add('working');
    
  }

  change(theme : string ){

    this.findElement(theme);
    localStorage.setItem('theme', theme);
  
  }


}
