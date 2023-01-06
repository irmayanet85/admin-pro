import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../servicios/auth/auth.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private ruta : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean >  {
      console.log('AdminGuard');
      if (this.auth.user.rol == environment.role.admin) {
        return of(true);
      } else {
        this.ruta.navigate(['./401'])
        return of(false)
      }
              

  }


  
  
 
}
