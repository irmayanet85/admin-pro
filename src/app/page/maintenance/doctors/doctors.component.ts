import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.models';
import { Usuario } from 'src/app/models/user.models';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { GestionDoctorService } from 'src/app/servicios/doctor/gestion-doctor.service';
import Swal from 'sweetalert2';
import { GestionHospitalService } from '../../../servicios/hospital/gestion-hospital.service';
import { Hospital } from 'src/app/models/hospital.models';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  public  search : string = '';
  public visible : number = -1;
  
  //new doctor
  public name : string = '';
  public listhospitals: Hospital[]=[]; 
  public newHospitalAssociateArray : string = '';


  public newname : string = '';
  
  public list: Doctor[] = [];
  public total : number = 0;

  public auth : Usuario;
  public from:number = 0;
  private paginator = 5;

  public objAction = {
    show : "display: block;",
    hide : "display: none;"
  }

  //associate to hospital
  public hospitalNotAssociateArray : Hospital[] = [];
  public newHospitalAssociate : string = '';
 

  constructor( private servauth : AuthService, private servgestDoctor: GestionDoctorService, private sergestHospital: GestionHospitalService) {
    this.auth = servauth.user;
   }
   focusOut(){
    console.log('focusout')
    this.visible = -1;
  }
  listHospitales(){
    this.sergestHospital.listHospital().subscribe(result=>{
      this.listhospitals = result.list;
      console.log('lista de hospitales cargadas', this.listhospitals);
    })
  }

  listhospitalNotAssociate(doctor: Doctor, idselect:string){
    this.hospitalNotAssociateArray.splice(0);
    let hospitalArrayIdDoctor : string [] = [];
    
    if (doctor.hospitales){
      hospitalArrayIdDoctor = doctor.hospitales?.map(
        hospital => hospital._id
      )
    }
    this.sergestHospital.listHospital().subscribe(result=>{

        for (let index = 0; index < result.list.length; index++) {
          const element = result.list[index];

          if (hospitalArrayIdDoctor.includes(element.id!) == false){
            this.hospitalNotAssociateArray.push(element);
          }  
          
        }
        if(this.hospitalNotAssociateArray.length ==0 ){
        Swal.fire('Atencion ', 'Dicho doctor esta asociado a todos los hospitales existentes', 'error')
        }
        else{
          const element = document.querySelector(`#${idselect}`);
          element?.setAttribute('style', this.objAction.show );
        }
        

      
    },(error)=>{
      console.log('error', error);
    } 
    )

    
    
  }

  saveNewDoctor(){
    console.log("creado el nuevo hospital");
    console.log ('arreglo de .hospitales asociados',this.newHospitalAssociateArray)

     this.servgestDoctor.AddMedicos(this.name, this.newHospitalAssociateArray).subscribe(
      result => {
        console.log(" doctor adicionado");
        this.listDoctor();
        this.cancel('addDoctor');
      }
     );
    
    this.newHospitalAssociateArray="";
  }
  visualizar(element : number){
    this.visible = element;
    this.newname = this.list[element].name;
    

  }

  cancel(modal:string){
   
    //this.nameNewHospital = '';
    const element = document.querySelector(`#${modal}`);
    element?.setAttribute('style', this.objAction.hide );
    

  }
  openModal(modal:string){
    this.listHospitales()
    const element = document.querySelector(`#${modal}`);
    element?.setAttribute('style', this.objAction.show );
  }

  ngOnInit(): void {
    this.listDoctor();
  
  }
  resetedit(){
    this.visible=-1;
    this.newname = '';
  }
 
  desasociateHospital(pos:number, doctor: Doctor){

    let hospitales:any= [];
    
    if(doctor.hospitales!.length > 0 )
    {
      hospitales = doctor.hospitales?.map(
        hospital => hospital._id
      )
      
      hospitales?.splice(pos, 1);
    
      this.servgestDoctor.editDoctor(doctor, hospitales).subscribe (
        result => {
          this.listDoctor();
        },
        (error)=> {
          console.log(error);
        }
      )
    }
  }
  asociateHospital( doctor: Doctor, idselect:string){

    let hospitales:string[]= [];

    if(doctor.hospitales!.length >= 1 )
    { 
      let array = doctor.hospitales;
      hospitales = array!?.map(
        hospital => hospital._id
      )}
    hospitales.push(this.newHospitalAssociate)
    this.servgestDoctor.editDoctor(doctor, hospitales).subscribe (
        result => {
          this.listDoctor();
        },
        (error)=> {
          console.log(error);
        }
      )
      this.newHospitalAssociate = '';
      this.listDoctor();
      this.hospitalNotAssociateArray = [];
      const element = document.querySelector(`#${idselect}`);
      element?.setAttribute('style', this.objAction.show ); 
  }


  editName(doctor : Doctor){

    let hospitales:string[]= [];

    if(doctor.hospitales!.length >= 1 )
    { 
      let array = doctor.hospitales;
      hospitales = array!?.map(
        hospital => hospital._id
      )}
    
    if(this.newname.length > 3) {
      doctor.name = this.newname;
      this.servgestDoctor.editDoctor(doctor, hospitales).subscribe(
        ()=> {
          
          this.resetedit();
          this.listDoctor();
         
        },
        (error)=>{
          console.log(error);
        }
      )
      
    }
   

    
  }
  Search(){
    // console.log(this.search.nativeElement);
    // console.log(this.search.nativeElement.value);
    
    // this.list=[];
    // this.total = 0;
    
    // this.servgestHosp.search(this.search).subscribe(
    //   result => {
       
    //     if (result.list.length > 0){
          
    //       this.list = result.list
    //       this.total = result.list.length;
    //       console.log('lista de hospital',this.list);
    //       console.log('total',this.total);

    //     }
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // )

    this.search = '';
  }

 

  deleteDoctor(id: string){
    this.servgestDoctor.deleteDoctor(id).subscribe(
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
              'the doctor has been deleted.',
              'success'
            )
            this.listDoctor();
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

  listDoctor(from_:number = 0) {
    this.list=[];
    this.total=0;
    this.servgestDoctor.listDoctors(from_).subscribe(
      result => {
        
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
       this.listDoctor(this.from);
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
      this.listDoctor(this.from);
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
