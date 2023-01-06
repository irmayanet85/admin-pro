import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.models';
import { Usuario } from 'src/app/models/user.models';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { GestionHospitalService } from 'src/app/servicios/hospital/gestion-hospital.service';
import Swal from 'sweetalert2';
import { SearchHospital, ListHospital } from '../../../interfaces/searchGlobal';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  public  search : string = '';
  public newname : string = '';
  public visible : number = -1;
  public nameNewHospital : string = '';

  public list: Hospital[] = [];
  public total : number = 0;

  public auth : Usuario;
  public from:number = 0;
  private paginator = 5;

  public objAction = {
    show : "display: block;",
    hide : "display: none;"
  }
  public acction : string = this.objAction.hide;

  constructor( private servauth : AuthService, private servgestHosp: GestionHospitalService) {
    this.auth = servauth.user;
   }
   focusOut(){
    console.log('focusout')
    this.visible = -1;
  }
  saveNewHospital(){
    console.log("creado el nuevo hospital");
     this.servgestHosp.AddHospital(this.nameNewHospital).subscribe(
      result => {
        console.log(" hospital adicionado");
        this.listHospital();
        this.cancel();
      }
     );

    
  }
  visualizar(element : number){
    this.visible = element;
    this.newname = this.list[element].name;
    const id = 'input' + this.visible;
    document.getElementById(id)?.focus();

  }

  cancel(){
   
    this.nameNewHospital = '';
    this.acction = this.objAction.hide
  }
  openModal(){
    this.acction = this.objAction.show
  }

  ngOnInit(): void {
    this.listHospital();
  
  }
  resetedit(){
    this.visible=-1;
    this.newname = '';
  }
  editName(pos : number){
    console.log('new name', this.newname, this.newname.length);
    if(this.newname.length > 3) {
      this.servgestHosp.editHospital(String(this.list[pos].id), this.newname).subscribe(
        ()=> {
          console.log("salvado");
          this.resetedit();
          this.listHospital();
         
        },
        (error)=>{
          console.log(error);
        }
      )
      
    }
    else {
      console.log('nombre no adecuado');

    }

    
  }
  Search(){
    // console.log(this.search.nativeElement);
    // console.log(this.search.nativeElement.value);
    
    this.list=[];
    this.total = 0;
    
    this.servgestHosp.search(this.search).subscribe(
      result => {
       
        if (result.list.length > 0){
          
          this.list = result.list
          this.total = result.list.length;
          console.log('lista de hospital',this.list);
          console.log('total',this.total);

        }
      },
      (error)=>{
        console.log(error);
      }
    )

    this.search = '';
  }

 

  deleteHospital(id: string){
    this.servgestHosp.deleteHospital(id).subscribe(
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
              'the hospital has been deleted.',
              'success'
            )
            this.listHospital();
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

  listHospital(from_:number = 0) {
    this.list=[];
    this.total=0;
    this.servgestHosp.listHospital(from_).subscribe(
      result => {
        console.log(result);
        if (result.total > 0){
          this.list = result.list;
          //console.log ('lista de usuarios', result.list) ;
          this.total = result.total;
        }
        },
      (error)=> {
        console.log('error', error);
      }
    )
  }
  nextBlockOfListUsers(){
     if (this.total > this.from + this.paginator){
       console.log(this.total, this.from);
       this.from = this.from + this.paginator; 
       this.listHospital(this.from);
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
      this.listHospital(this.from);
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
