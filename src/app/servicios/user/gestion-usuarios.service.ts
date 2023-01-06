import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListUsers } from 'src/app/interfaces/searchGlobal';
import { Usuario } from 'src/app/models/user.models';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';
import { SearchUser } from '../../interfaces/searchGlobal';


@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

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

   listUsers(from: number=0){
      
      const urlconexion = `${this.url}/usuarios?from=${from}`;
      
    
      return this.httpclient.get<ListUsers>(urlconexion, this.header)
        .pipe(
          map( result => {
              const list = result.list.map(
                user => new Usuario(user.name,user.email,'', user.img,user.rol, user.google, user.id)  
              )
              return { list ,total : result.total}
               
            })
        );
      
    }

    searchUsers(termino: string){
      
      const urlconexion = `${this.url}/search/${termino}`;
      const token = localStorage.getItem('token');
      let header= new HttpHeaders();
      header = header.set('x-token', token!);
    
      return this.httpclient.get<SearchUser>(urlconexion, {headers:header});
      
    }

    deleteUser(id:string){
      const urlconexion = `${this.url}/usuarios/${id}`;
      const token = localStorage.getItem('token');
      let header= new HttpHeaders();
      header = header.set('x-token', token!);
    
      return this.httpclient.delete(urlconexion, {headers:header});

    }

    editRole(user: Usuario){
    
      const urlconexion = `${this.url}/usuarios/role/${user.id}`;
      return this.httpclient.put(
        urlconexion,{"rol" : user.rol}, this.header);
      
    }


   
}
