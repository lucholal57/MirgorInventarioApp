import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { LineaTelefonica } from 'src/app/entidades/linea_telefonica/linea-telefonica';
import { LineaTelefonicaService } from 'src/app/services/linea_telefonica/linea-telefonica.service';
import { AlertService} from '../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-linea-telefonica',
  templateUrl: './linea-telefonica.component.html',
  styleUrls: ['./linea-telefonica.component.css']
})
export class LineaTelefonicaComponent implements OnInit {
  p:number = 1;
  //Array de Lineas Telefonicas
  listadoLineaTelefonica : LineaTelefonica[] =[];
  //Busqueda linea
  buscar_linea_telefonica = "";
    // Variables Botones
    public btnGuardar = false;
    public btnEditar = false;
    public btnCancelar = false;

  constructor(
    private servicioLineaTelefonica : LineaTelefonicaService,
    private formBuilder : FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private alertas : AlertService
  ) { }

  ngOnInit(): void {
    this.getLineaTelefonica();
  }

  //Formulario Registro Reactivo
  formularioRegistro= this.formBuilder.group({
    id:[''],
    numero:['',[Validators.required]],
    plan:['',[Validators.required]],
  })

  //Open funcion para abrir ventana modal
  open(content:any) {
    this.modalService.open(content,{size:'lg',backdrop: 'static'});
    this.btnGuardar=false;
    this.btnEditar=true;
  }
  // Funcion para cerrar ventana modal
  cerrarModal(): void{
    this.modalService.dismissAll();
    this.formularioRegistro.reset();
  }

  getLineaTelefonica(): void{
    this.servicioLineaTelefonica.getLineaTelefonica().subscribe(
      (res) => {
        this.listadoLineaTelefonica = res;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  registrarLineaTelefonica(): void{
    this.servicioLineaTelefonica.validacionLineaTelefonica(this.formularioRegistro.value.numero).subscribe(
      (res) => {
        if(res.length==0){
          if (this.formularioRegistro.valid)
          {
            this.servicioLineaTelefonica.registrarLineaTelefonica(this.formularioRegistro.value).subscribe(
              (res) => {
                console.log(res)
                this.cerrarModal();
                this.getLineaTelefonica();
                this.alertas.alertsuccess();
              },
              (error) => {
                console.log(error)
                this.alertas.alerterror();
              }
            )
          }else{
            this.alertas.alertcampos();
          }
        }else{
          this.alertas.alertActivoExistente();
          this.formularioRegistro.controls['numero'].reset();
        }
      }
    )

  }

  LineaTelefonicaId(linea_telefonica: LineaTelefonica, content : any): void {
    this.formularioRegistro.controls['numero'].disable();
    this.btnEditar = false;
    this.btnGuardar = true;
    this.modalService.open(content,{size:'lg'});
    this.servicioLineaTelefonica.getLineaTelefonicaId(linea_telefonica).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          numero: res[0].numero,
          plan: res[0].plan
        })
      },
      (error) => {
        console.log(error)
      }
    );
  }

  editarLineaTelefonicaId(): void{
    this.formularioRegistro.controls['numero'].enable();
     this.servicioLineaTelefonica.editarLineaTelefonica(this.formularioRegistro.value, this.formularioRegistro.value.id).subscribe(
       (res) => {
         console.log(res)
         this.alertas.alertedit();
         this.getLineaTelefonica();
         this.cerrarModal();
         },
        (error) => {
          console.log(error)
          this.alertas.alerterror();
            }
          );
  }

   // Eliminar alumno enviado por id
   eliminarLineaTelefonica(linea_telefonica: LineaTelefonica): void {

    Swal.fire({
      title: 'Esta seguro de eliminar??',
      text: 'No podra revertir el cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioLineaTelefonica.eliminarLineaTelefonica(linea_telefonica.id).subscribe(
          (res) => {
          this.getLineaTelefonica();
    });
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }

    });
}

 // Funcion cancelar solo para borrar los valores de formulario reLocacion
 cancelar(): void{
  this.formularioRegistro.reset();
}

// Busqueda de acompañantes por alumno
busquedaLineaTelefonica(): void{
  if (this.buscar_linea_telefonica== ""){
    this.alertas.alertcampos();
  }else{
    this.servicioLineaTelefonica.busquedaLineaTelefonica(this.buscar_linea_telefonica).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
        }else{
          this.alertas.alertLoadingError();
        }
        this.listadoLineaTelefonica= res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}

// Funcion para cancelar busqueda por alumno
cancelarbusquedaLineaTelefonica(): void {
  this.getLineaTelefonica();
  this.buscar_linea_telefonica = "";
}


}
