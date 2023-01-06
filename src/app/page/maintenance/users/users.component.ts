import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListUsers } from 'src/app/interfaces/searchGlobal';
import { Usuario } from 'src/app/models/user.models';
import { GestionUsuariosService } from 'src/app/servicios/user/gestion-usuarios.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../servicios/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //@ViewChild('txtSearch') search! : ElementRef<HTMLInputElement>;
  public  search : string = '';
  public list: Usuario[] = [];
  public total : number = 0;

  public auth : Usuario;
  public from:number = 0;
  private paginator = 5;

  constructor(private servgestuser : GestionUsuariosService, private servauth : AuthService) {
    this.auth = servauth.user;
   }
  
 

  ngOnInit(): void {
    this.listUsers();
  }
  Search(){
    // console.log(this.search.nativeElement);
    // console.log(this.search.nativeElement.value);
    console.log(this.search);
    this.list=[];
    
    this.servgestuser.searchUsers(this.search).subscribe(
      result => {
        const users = result.usuarios;
        console.log('result', );
        if (users.length > 0){
          for (let index = 0; index < users.length; index++) {
            const element = users[index];
            const newUser = new Usuario(element.name, element.email,'',element.img,element.rol, element.google, element.id)
            this.list.push(newUser);
          }
          //console.log(this.list);
        }
      },
      (error)=>{
        console.log(error);
      }
    )

    this.search = '';
  }

  changeRole(user:Usuario){
    //console.log('valor del evento', user.rol);
    this.servgestuser.editRole(user).subscribe(
      () => {
        Swal.fire('Success!','Fue actualizado el rol de forma exitosa','success')},
        (error)=> {
          console.log('error', error.error.msg);
          Swal.fire('Alert!', error.error.msg,'error')
        }
    )
  }

  deleteUser(id: string){
    
    this.servgestuser.deleteUser(id).subscribe(
      () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'the user has been deleted.',
              'success'
            )
            this.listUsers();
          }
        }
        )
        
        
      },
      (error)=>{
        if (error.error.msg){
  
          Swal.fire({
            title: 'Atencion!',
            text: error.error.msg,
            icon: 'warning',
            confirmButtonText: 'ok'
          })
        }
        else {
          console.log('error arojado', error);
          Swal.fire({
            title: 'Error!',
            text: 'Upss ocurrio un error inesperado',
            icon: 'error',
            confirmButtonText: 'ok'
          })
        }
      }
    )

    this.search = '';
  }

  listUsers(from_:number = 0) {
    this.list=[];
    this.total=0;
    this.servgestuser.listUsers(from_).subscribe(
      result => {
        if (result.total > 0){
          this.list = result.list;
          //console.log ('lista de usuarios', result.list) ;
          this.total = result.total;
        }
        },
      (error)=> {
        console.log('error', error.error.msg);
      }
    )
  }
  nextBlockOfListUsers(){
     if (this.total > this.from + this.paginator){
       console.log(this.total, this.from);
       this.from = this.from + this.paginator; 
       this.listUsers(this.from);
     }
     else {
      Swal.fire({
        title: 'Atencion!',
        text: 'Ya no existen mas elementos que mostrar',
        icon: 'warning',
        confirmButtonText: 'ok'
      })
     }

  }


  previousBlockOfListUsers(){
    if (this.from > 0){
      this.from = this.from - this.paginator; 
      this.listUsers(this.from);
    }
    else {
     Swal.fire({
       title: 'Atencion!',
       text: 'Ya no existen mas elementos que mostrar',
       icon: 'warning',
       confirmButtonText: 'ok'
     })
    }

 }


}
