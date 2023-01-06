import { environment } from '../../environments/environment.prod';
export class Usuario {
 constructor(
    public name  : string,
    public email : string,
    public password? : string,
    public img? : string,
    public rol? : string,
    public google? : string,
    public id? : string
 ){

 }

 getName(){
   return this.name;
 }
 getURLImg()
 {
    if (!this.img){
      return `${environment.urlApi}/download/user/img-no`

    }
    else return  `${environment.urlApi}/download/user/${this.img}`;
 }

}