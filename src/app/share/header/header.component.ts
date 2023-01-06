import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth/auth.service';
import { environment } from '../../../environments/environment';
import { ImgService } from 'src/app/servicios/img/img.service';
import { Usuario } from '../../models/user.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
   //public imgToShow! : any;
   public user!: Usuario;
  constructor(
    private router : Router, 
    private servauth : AuthService, 
    //private servimg: ImgService
    ) {
      this.user = servauth.user;

   }
//    createImageFromBlob(image: Blob) {
//     let reader = new FileReader();
//     reader.addEventListener("load", () => {
//        this.imgToShow = reader.result;
//     }, false);
 
//     if (image) {
//        reader.readAsDataURL(image);
//     }
//  }
//  downloadImg ()
//  {
//    console.log ('nombre de la imagen', this.nameImage)
//    if (this.nameImage ){ 
    
     
//      this.servimg.downloadImg('user', this.nameImage!).subscribe(
//        result => {
//          this.createImageFromBlob(result) ;
//         },
//         (error)=> {
//           console.log('ocurrio un error')
//         })
//       }
      
//     };
    ngOnInit(): void {
      // console.log('entrando al onginit del header!!!!')
      // this.downloadImg();
      
    }
    
    get name(){
      return this.servauth.user.name;
    } 
    get email(){
      return this.servauth.user.email;
    } 
    get nameImage(){
      return this.servauth.user.img;
    }
    get img():any{
      
      return `${environment.pathImg}/anonimos.png`; 
    } 
  logOut(){
    this.servauth.logout();
    this.router.navigate(['/login']);
  }

}
