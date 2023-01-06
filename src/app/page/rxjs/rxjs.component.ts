import { Component, OnInit } from '@angular/core';
import { interval, map, Observable, observable, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { 
     
   this.retornaIntervalOptimizado().subscribe(valor => console.log (valor));

    // this.retornarIntervalManual()
    // .pipe(
    //   retry(2)

    // ).subscribe( 
    //   sms => console.log ('intervalo', sms),
    //   error => console.warn(error),
    //   ()=> console.log( "completado el observ"));

  }

  retornaIntervalOptimizado(){

    return interval(1000)
    .pipe(
      take(4),  //Quiero emitir solo 4 inervalor o emisiones de este observable
      map(valor => { 
        return valor + 1 ;
      })   //Transformando la data del observable. 
    );
  }

  retornarIntervalManual(): Observable <number>{
    let i = 0;
    return new Observable <number>(observer =>{
      
      let interval = setInterval( ()=> {
        i ++;
        observer.next (i);
        if (i == 4){
          clearInterval(interval);
          observer.complete();
        }
        if (i == 2){
          observer.error(" llego al valor 2");
        }
      }, 1000)

  });
  }

  ngOnInit(): void {
  }

}
