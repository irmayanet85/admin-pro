import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/user.models';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ListHospital, SearchHospital } from '../../interfaces/searchGlobal';
import { map, Observable } from 'rxjs';
import { Hospital } from '../../models/hospital.models';

@Injectable({
  providedIn: 'root'
})
export class GestionHospitalService {

  private url:string = environment.urlApi;
  private user! : Usuario;
  
  constructor(private httpclient: HttpClient, private servauth: AuthService ) {
    this.user = servauth.user;
   }

   get header(){
      const token = localStorage.getItem('token');
      let header= new HttpHeaders();
      header = header.set('x-token', token!);
      return {headers:header}
   }

   listHospital(from: number=0): Observable<ListHospital>{
      
      const urlconexion = `${this.url}/hospitales?from=${from}`;
      
    
      return this.httpclient.get<any>(urlconexion, this.header)
        .pipe(
          map( result => {
                let listhospital: Hospital[] = [];
                let finalyResult! : ListHospital ;


                for (let index = 0; index < result.list.length; index++) {
                  const element = result.list[index];
                  let usuario = null ;
                  if (element.usuario){
                    usuario = new  Usuario(element.usuario!.name, element.usuario!.email,"", element.usuario?.img, element.usuario?.rol, element.usuario?.google, element.usuario?._id )  

                  }
                  const hospital =  new Hospital(element.name, element.img, usuario!, element.id)
                  //console.log(hospital);
                  listhospital.push(hospital);
                }
                
                //console.log('desde serv', listhospital); 
              
              return {list:listhospital, total:listhospital.length};
               
            })
        );
      
    }

    search(termino: string): Observable<ListHospital>{
      
      const urlconexion = `${this.url}/search/${termino}`;
      return this.httpclient.get<any>(urlconexion, this.header)
      .pipe(
        map( result => {
              let listhospital: Hospital[] = [];
              
              for (let index = 0; index < result.hospitales.length; index++) {
                const element = result.hospitales[index];
                let usuario = null ;
                if (element.usuario){
                  usuario = new  Usuario(element.usuario!.name, element.usuario!.email,"", element.usuario?.img, element.usuario?.rol, element.usuario?.google, element.usuario?._id )  

                }
                const hospital =  new Hospital(element.name, element.img, usuario!, element.id)
                //console.log(hospital);
                listhospital.push(hospital);
              }
              
              //console.log('desde serv', listhospital); 
            
            return {list:listhospital, total:listhospital.length};
             
          })
      );
      
    }

    deleteHospital(id:string){
      const urlconexion = `${this.url}/hospitales/${id}`;
      return this.httpclient.delete(urlconexion, this.header);

    }

    editHospital(id:string, name:string){
      const urlconexion = `${this.url}/hospitales/${id}`;
      return this.httpclient.put(urlconexion, {name},this.header);

    }

    AddHospital(name:string){
      const urlconexion = `${this.url}/hospitales`;
      return this.httpclient.post(urlconexion, {name},this.header);

    }

   



}
