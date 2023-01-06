import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Usuario } from 'src/app/models/user.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario!: Usuario;
  private url:string = environment.urlApi;

  constructor(private httpclient: HttpClient) { }
  
  get user ()
  {
    return this.usuario;
  }
  registerUser(newUser: Usuario){

    const urlconexion = `${this.url}/usuarios`;
    return this.httpclient.post<any>(urlconexion,newUser);
    
  }

  ValidateAuthAndrenewToken(): Observable<boolean >{
    const urlconexion = `${this.url}/login/renew`;
    const token = localStorage.getItem('token');
    if (token){
      let header= new HttpHeaders();
      header = header.set('x-token', token!);
  
      return this.httpclient.get<any>(urlconexion,{'headers' : header}).pipe (
        tap((result) => {
          const { name,email, img, rol, google, id } = result.user;
          this.usuario = new Usuario (name, email, '', img, rol, google, id);
          localStorage.setItem('token', result.token);
        }),
        map(result => true),
        catchError(error => of(false))
      );

    }
    else return of(false);
  }

  login(email: string, password: string ){
    const urlconexion = `${this.url}/login`;
    const login = 
      {
        "email": email,
        "password": password,
        }
    
    return this.httpclient.post<any>(urlconexion,login).pipe (
      tap((result:any) => {
        localStorage.setItem('token', result.token)
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
  }
}
