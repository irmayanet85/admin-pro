import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  public miFormulario : FormGroup = this.fb.group({
    email : ['irmayanet85@nauta.cu', [ Validators.required]],
    password : ['AmriTenay*85', [Validators.required]],
  });
  private formSubmited = false;

  constructor( private router : Router, private servauth: AuthService, private fb: FormBuilder) { }
  getFild(name:string){
    return this.miFormulario.get(name)?.value;
  }
  getControl(name:string){
    return this.miFormulario.get(name);
  }
  touchedControl(name:string){
    return this.getControl(name)?.touched;
  }

  fieldNotValid(name:string){
    if (((this.touchedControl(name) == true) && (this.getControl(name)?.invalid == true)) || ((this.formSubmited == true)&& (this.getControl(name)?.invalid == true)) ) {
      return true;
    }
    return false;
  }

  
  login(){
    
    this.formSubmited = true;
    if(this.miFormulario.valid == true){

      this.servauth.login(this.getFild('email'), this.getFild('password')).subscribe(
        result => {
          
          this.router.navigate(['/'])
        }, 
        (error)=> {
          if (error.error.msg){

            Swal.fire({
              title: 'Error!',
              text: error.error.msg,
              icon: 'error',
              confirmButtonText: 'Ok',
            })
          }
          else {
            Swal.fire({
              title: 'Error!',
              text: "Upss!!! ocurrio un error inesperado contacte con nuestros administradores",
              icon: 'error',
              confirmButtonText: 'Ok',
            })
          }
        
      })
    }
    else {
      console.log('formulario no enviado');
    }
    

};
}
