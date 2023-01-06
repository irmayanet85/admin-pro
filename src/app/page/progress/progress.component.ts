import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent  {
  valor:number = 80;
  btn: string = "btn btn-info";


  valor2: number = 20;
  
  get sizecomponent(){
      return `width: ${this.valor}%; height:10px;`
  }
  get sizecomponent2(){
    return `width: ${this.valor2}%; height:10px;`
}
 

}
