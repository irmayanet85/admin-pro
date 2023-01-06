import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  

   this.getUser().then(data=> {
    console.log('hola', data);
   });

  }

  getUser(){
    return  new Promise( (resolve) => {

      fetch('https://reqres.in/api/users')
      .then(resp=> resp.json()
      .then(data => resolve (data.data))
      )
      
    })

    
    
  }

}
