import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/guard/pending-changes-guard.guard';

import { Usuario } from 'src/app/models/user.models';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { ImgService } from 'src/app/servicios/img/img.service';
import { ProfileService } from 'src/app/servicios/user/profile.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Item } from '../../servicios/tools/sidebar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements ComponentCanDeactivate {
  public user! : Usuario;
  public img! : File;
  public imgTemp! : any;
  private formSubmited = false;
  private showfieldPassword = false;
  public miFormulario : FormGroup = this.fb.group({
    name : [, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email : [, [ Validators.pattern(environment.emailPattern)]],
    //password : [, [Validators.required, this.passworRequeriment()]],
    //password2 : [, [Validators.required]],
  });
  
  

  
  

  constructor(private fb: FormBuilder, 
    private servreg: AuthService, 
    private servprof: ProfileService,
    private servImg: ImgService) { 
    this.user = this.servreg.user;
    this.getControl('name')?.setValue(this.user.name);
    this.getControl('email')?.setValue(this.user.email);

  }
  canDeactivate(): Observable <boolean> | boolean {
    return !this.miFormulario.dirty;
  }

  onFileChange(event:any)
  {
    if (event.target.files.length > 0) {
    const file:File = event.target.files[0];
    this.img = file;

    const reader = new FileReader();
    reader.readAsDataURL(this.img);
    reader.onloadend = () => {
      console.log(reader.result);
      this.imgTemp = reader.result
    }
    }
    
  }

  enableButtonUpload(){
    if (this.img) {
      return 'enabled';
    } else return 'disabled';
    
  }

  updateNameEmail(){
    console.log('actualizando')
    if (this.miFormulario.valid == true){
      this.servprof.UpdateUser(this.getFild('name'), this.getFild('email'))
      .subscribe(resul => {
        Swal.fire({
          title: 'Exito!',
          text: 'El usuario fue actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'continuar'
        })
      },
      (error)=> {
        if (error.error.msg){
  
          Swal.fire({
            title: 'Atencion!',
            text: error.error.msg,
            icon: 'warning',
            confirmButtonText: 'ok'
          })
        }
        else {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Upss ocurrio un error inesperado',
            icon: 'error',
            confirmButtonText: 'ok'
          })
        }
      })
    }
    
  } 
  

  updateImg(){
    if (this.img){
      console.log('img valido');
      console.log(this.img);
      this.servImg.uploadImg(
        'user',
        this.servreg.user.id! ,
        this.img)
      .subscribe(() => {
        Swal.fire({
          title: 'Exito!',
          text: 'La imagen fue actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'continuar'
        })
      },
      (error)=> {
        if (error.error.msg){
  
          Swal.fire({
            title: 'Atencion!',
            text: error.error.msg,
            icon: 'warning',
            confirmButtonText: 'ok'
          })
        }
        else {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Upss ocurrio un error inesperado',
            icon: 'error',
            confirmButtonText: 'ok'
          })
        }
      })
    }
    
  } 
  
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

};
