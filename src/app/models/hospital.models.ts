import { environment } from '../../environments/environment.prod';
import { Usuario } from './user.models';
export class Hospital {
 constructor(
    public name  : string,
    public img? : string,
    public usuario? : Usuario,
    public id? : string
 ){

 }

 getURLImg()
 {
    if (!this.img){
      return `${environment.urlApi}/download/hospital/img-no`

    }
    else return  `${environment.urlApi}/download/hospital/${this.img}`;
 }

}