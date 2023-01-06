import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}


@Injectable({
  providedIn: 'root'
})
export class  PendingChangesGuardGuard implements CanDeactivate<unknown> {
  async canDeactivate(
    component: ComponentCanDeactivate):  Promise<any>  {
      console.log('entrando al candeactivate');
      let resultado : boolean = false;
      // if there are no pending changes, just allow deactivation; else confirm first
      // return component.canDeactivate() ?
      //   true :
      //   confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
        if (component.canDeactivate() == true){
          return true;
        }
        else {
       await Swal.fire({
            title: 'warning!',
            text: 'You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.',
            icon: 'warning',
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: 'Continuar',
            denyButtonText : 'Cancelar'
          }).then((result) => {
            
            if (result.isConfirmed) {
              resultado = true;
            } else if (result.isDenied) {
              resultado = false;
            }
            
          })
          
        }
        
        return resultado;
  
    }
  
}
