import { environment } from '../../environments/environment.prod';
import { Hospitale, Usuario } from '../interfaces/doctorlist.interface';
export class Doctor {
 constructor(
    public name  : string,
    public img? : string,
    public usuario? : Usuario,
    public id? : string,
    public hospitales? : Hospitale[],
 ){

 }

 getURLImg()
 {
    if (!this.img){
      return `${environment.urlApi}/download/medico/img-no`

    }
    else return  `${environment.urlApi}/download/medico/${this.img}`;
 }

}