import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Usuario } from 'src/app/models/user.models';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url:string = environment.urlApi;
  private user! : Usuario;

  constructor(private httpclient: HttpClient, private servauth: AuthService ) {
    this.user = servauth.user;
   }

  UpdateUser(name : string, email: string){
    console.log ('data', name, email);
    const urlconexion = `${this.url}/usuarios/${this.user.id}`;
    const token = localStorage.getItem('token');
    let header= new HttpHeaders();
    header = header.set('x-token', token!);
  
    return this.httpclient.put(
      urlconexion,
      {"name" : name,
        "email" : email },
      {headers: header})
      .pipe (
        tap( result => {
          this.user.name = name;
          this.user.email = email;
        })
      );
    
  }
  
}
