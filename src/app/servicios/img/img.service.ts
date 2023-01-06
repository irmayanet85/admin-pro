import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable, catchError, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  private url:string = environment.urlApi;
  constructor(private httpclient: HttpClient,
     private servauth : AuthService,
     private router: Router) { }

  uploadImg(type:string, idObject: string, img : File, maintentance : boolean = false){

    const urlconexion = `${this.url}/upload/${type}/${idObject}`;
    const token = localStorage.getItem('token');
    
      let header= new HttpHeaders();
      header = header.set('x-token', token!);
      const formData = new FormData();
      formData.append('image', img)

      return this.httpclient.put(urlconexion, formData, {headers : header})
        .pipe (
          tap((result:any) => {
            if (maintentance == false){ 
              this.servauth.user.img = result.filename;
              console.log('nuevo nombre de img', this.servauth.user.img);

            }
          })
        );
      }
    
  downloadImg(type : string, nameImg: string): Observable <any> {
    const urlconexion = `${this.url}/download/${type}/${nameImg}`;
    const token = localStorage.getItem('token');
    
      let header= new HttpHeaders();
      header = header.set('x-token', token!);
      return this.httpclient.get(urlconexion,{
        headers : header, 
        responseType : 'blob',
    }, );
      
   
  
}
}
