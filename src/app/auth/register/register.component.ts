import { Component,  } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/user.models';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../servicios/auth/auth.service';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  
  private formSubmited = false;
  private showfieldPassword = false;
  public miFormulario : FormGroup = this.fb.group({
    name : ['irma', [Validators.required, Validators.minLength(1)]],
    email : ['irma@nauta.cu', [ Validators.pattern(environment.emailPattern)]],
    password : ['AmriTenay*85', [Validators.required, this.passworRequeriment()]],
    password2 : ['AmriTenay*85', [Validators.required]],
    termCondition : [true, [Validators.requiredTrue]],
  }
  , { validators : this.passwordNotMach()
  })

  constructor(private fb: FormBuilder, private servreg: AuthService, private router: Router) { }
  passwordNotMach(){

    return (formGroup: FormGroup) : any => {
      const pass = formGroup.get('password');
      const pass2 = formGroup.get('password2');
      if(pass?.value != pass2?.value)
      {
        console.log('son diferentes');
        pass2?.setErrors({notEqual: true});
      } 
      else {
        console.log('son iguales');

        pass2?.setErrors(null);

      }
      
  }
 }
  passworRequeriment(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass = String(control.value);
      let count = 0;
      if ( (pass.length >= 8) && (pass.length <= 32))
      {
           if( pass.match(".*\\d.*") )
              count ++;
           if( pass.match(".*[a-z].*") )
              count ++;
           if( pass.match(".*[A-Z].*") )
              count ++;
           const shain = ".*[*.!@#$%^&(){}[]:" + ";'<>,.?/~`_+-=|\\].*"
           if( pass.match(shain) )
              count ++;
           
        }
     
        if (count >= 3)
        {
        
         return null;
        }
  
        return {forbiddenName: {value: 'La constrasena no cumple con el patron'}};
      }
      
    };
  showPassword()
  {
    console.log('disparado el evento');
    this.showfieldPassword = !this.showfieldPassword ;
    const password1 = document.querySelector("#password1");
    const password2 = document.querySelector("#password2");

    let type = 'password';

    if (this.showfieldPassword == true) type = 'text';
    console.log('type:', type);
    password1?.setAttribute('type', type );
    password2?.setAttribute('type', type );

  }
 
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
      //console.log(name, 'true', this.getFild(name));
      return true;
    }
    //console.log(name, 'false');
    return false;
    
  }
  
  termNotValid() {
    if((this.getFild('termCondition') == false) && this.formSubmited == true)  return true;
     return false;
   }
  
  
  registerUser(){
    this.formSubmited = true;
    
    if (this.getFild('termCondition')== true){
      const newUser : Usuario = new Usuario ( this.getFild('name'), this.getFild('email'),this.getFild('password'))
      
      this.servreg.registerUser(newUser).subscribe(
        result => {
          console.log('result correctoooo fue adicionado');
          Swal.fire({
            title: 'Exito!',
            text: 'El usuario fue creado correctamente, desea continuar',
            icon: 'success',
            confirmButtonText: 'continuar'
          }).then(result => {
            this.router.navigate(['/login']);
          })
        }, 
        (error)=> {

          Swal.fire({
            title: 'Error!',
            text: error.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok',
          })
        console.log('error retornado por el server', error.error.msg);
      })
      
    }
    else {
      console.log('formulario no enviado');
    }
    
    //console.log("registrado", `${this.getFild('name')?.value} ${this.getFild('email')?.value} ${this.getFild('password')?.value} ${this.getFild('termCondition')?.value}`)


  }

  

}
