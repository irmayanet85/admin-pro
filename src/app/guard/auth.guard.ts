import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../servicios/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private auth: AuthService, private ruta : Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean  | Observable<boolean> {
    return this.auth.ValidateAuthAndrenewToken()
      .pipe(
        tap(result=>{
          console.log('CanLoad',result);
          if(result == false){
            this.ruta.navigate(['./login'])
          
          }
         
        })
      );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean >  {
      return this.auth.ValidateAuthAndrenewToken()
      .pipe(
        tap(result=>{
          console.log('CanActivate',result);
          if(result == false){
            this.ruta.navigate(['./login'])
            
          }
         
        })
      );

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
  

  
  
 
}
