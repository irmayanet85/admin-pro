import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.models';
import { ImgService } from 'src/app/servicios/img/img.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-img',
  templateUrl: './cargar-img.component.html',
  styleUrls: ['./cargar-img.component.css']
})

export class CargarImgComponent implements OnInit {

  @Input() objetselected!: any;
  @Input() typeObject! : 'user' | 'medico' | 'hospital'
  public img! : File;
  public imgTemp! : any;
  public objAction = {
    show : "display: block;",
    hide : "display: none;"
  }
  public acction : string = this.objAction.hide;
  constructor(private servImg: ImgService) { }
  onFileChange(event:any)
  {
    
    if (event.target.files.length > 0) {
      const file:File = event.target.files[0];
      this.img = file;
      

      const reader = new FileReader();
      reader.readAsDataURL(this.img);
      reader.onloadend = () => {
      this.imgTemp = reader.result;
      
      }
    }
    
  }
  updateImg(){
    if (this.img){
      //console.log('img valido');
      console.log(this.img);
      this.servImg.uploadImg( this.typeObject,this.objetselected.id!,this.img, true)
      .subscribe(result => {
        this.objetselected.img = result.filename;
        this.cancel();
        Swal.fire('Exito!','La imagen fue actualizado correctamente','success')
      },
      (error)=> {
        if (error.error.msg){
            Swal.fire('Atencion!', error.error.msg, 'warning')
        }
        else {
          console.log(error);
          Swal.fire('Error!','Upss ocurrio un error inesperado','error')
        }
      })
    }
    
  } 
  
  

  ngOnInit(): void {
  }
  cancel(){
    this.imgTemp = '';
    //this.img = null;

    this.acction = this.objAction.hide
  }
  openModal(){
    this.acction = this.objAction.show
  }

}
