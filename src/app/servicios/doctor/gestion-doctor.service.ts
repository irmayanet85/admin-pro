import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Doctor } from 'src/app/models/doctor.models';
import { Usuario } from 'src/app/models/user.models';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Hospital } from 'src/app/models/hospital.models';
import { Hospitale, ListDoctors } from 'src/app/interfaces/doctorlist.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionDoctorService {

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

   listDoctors(from: number=0): Observable<any>{
      
      const urlconexion = `${this.url}/medicos?from=${from}`;
      
    
      return this.httpclient.get<ListDoctors>(urlconexion, this.header)
      .pipe(
        map( result => {
            const list = result.list.map(
              doctor => new Doctor(doctor.name, doctor.img, doctor.usuario, doctor.id , doctor.hospitales)  
            )
            return { list , total : result.total}
             
          })
      );
      
    }

    search(termino: string){
      
      // const urlconexion = `${this.url}/search/${termino}`;
      // return this.httpclient.get<any>(urlconexion, this.header)
      // .pipe(
      //   map( result => {
      //         let listhospital: Hospital[] = [];
              
      //         for (let index = 0; index < result.hospitales.length; index++) {
      //           const element = result.hospitales[index];
      //           let usuario = null ;
      //           if (element.usuario){
      //             usuario = new  Usuario(element.usuario!.name, element.usuario!.email,"", element.usuario?.img, element.usuario?.rol, element.usuario?.google, element.usuario?._id )  

      //           }
      //           const hospital =  new Hospital(element.name, element.img, usuario!, element.id)
      //           //console.log(hospital);
      //           listhospital.push(hospital);
      //         }
              
      //         //console.log('desde serv', listhospital); 
            
      //       return {list:listhospital, total:listhospital.length};
             
      //     })
      // );
      
    }

    deleteDoctor(id:string){
      const urlconexion = `${this.url}/medicos/${id}`;
      return this.httpclient.delete(urlconexion, this.header);

    }

    editDoctor(doctor:Doctor, hospitales:any){
      const urlconexion = `${this.url}/medicos/${doctor.id}`;
      return this.httpclient.put(urlconexion, {name:doctor.name, hospitales },this.header);

    }

    AddMedicos(name:string, hospitales:any){
      const urlconexion = `${this.url}/medicos`;
      return this.httpclient.post(urlconexion, {name,hospitales},this.header);

    }

   




}
