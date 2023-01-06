import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent {
  @Output() newvaluehijo = new EventEmitter<number>();
  @Input() valorhijo!:number;
  @Input() colorbotonhijo: string = "btn btn-primary";
  invalid : boolean = false
  

  modifica(valor: number){
    

    if (this.valorhijo + valor >= 100) {
      this.valorhijo = 100;
      return this.newvaluehijo.emit(this.valorhijo);
    }
    if (this.valorhijo + valor <= 1) {
      this.valorhijo = 1;
      return this.newvaluehijo.emit(this.valorhijo);
    }

    this.valorhijo = this.valorhijo + valor;
    return this.newvaluehijo.emit(this.valorhijo);

    
  }

  notificaCambio(valor:number) {
    
    if (valor > 100) {
     
      this.invalid =  true;
      console.log ('>100');
      return this.newvaluehijo.emit(100);
    }
    if (valor < 1){
       
      this.invalid =  true;
      console.log ('<1');
      return this.newvaluehijo.emit(1);
    }
    if (valor == 0)
    {
      
      this.invalid =  true;
      console.log('if 0', this.valorhijo )
      return this.newvaluehijo.emit(1);
    }
    else {
      console.log ('cumple');
      this.invalid =  false;
      return this.newvaluehijo.emit(this.valorhijo);

    }
    
    

    
    

  }



}
