import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Activo } from 'src/app/entidades/activos/activo_industrial/activo';
import { ActivoService } from 'src/app/services/activos/activo_industrial/activo.service';
import { AlertService} from '../../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

// Funcion
@Component({
  selector: 'app-activo',
  templateUrl: './activo.component.html',
  styleUrls: ['./activo.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ActivoComponent implements OnInit {
  p:number = 1;
  //Array de Activos
  listadoActivos :Activo[] =[];
  //Array de Activos
    listadoActivosExistente :Activo[] =[];
  //Buscar activo
  buscar_activo = "";

   // Variables Botones
   public btnGuardar = false;
   public btnEditar = false;
   public btnCancelar = false;

  constructor(
    private servicioActivo: ActivoService,
    private formBuilder : FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private alertas : AlertService,
    ) { }

  ngOnInit(): void {
    this.getActivos();
  }
  //Formulario Registro
  formularioRegistro= this.formBuilder.group({
    id:[''],
    inventario:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    marca:['',[Validators.required]],
    modelo:['',[Validators.required]],
    serie:['',[Validators.required]],
    hostname:['',[Validators.required]],
    dpi:[''],
    ip:[''],
    estado:['',[Validators.required]],
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

  getActivos(): void{
    this.servicioActivo.getActivos().subscribe(
      (res) => {
        this.listadoActivos = res;
      },
    (error) => {
      console.log(error)
    }
    )
  }
  registrarActivos():void{
    this.servicioActivo.validacionInventario(this.formularioRegistro.value.inventario).subscribe(
      (res) => {
        if(res.length==0)
        {
          if(this.formularioRegistro.valid)
          {
            this.servicioActivo.registrarActivo(this.formularioRegistro.value).subscribe(
              (res) => {
                console.log(res)
                this.cerrarModal();
                this.getActivos();
                this.alertas.alertsuccess();
              },
              (error) => {
                console.log(error)
                this.alertas.alerterror();
              }
            )
          }
          else{
            this.alertas.alertcampos();
          }
        }else{
          this.alertas.alertActivoExistente();
          this.formularioRegistro.controls['inventario'].reset();
        }
      }
    )


  }

  // Obtener Activo por id para mostrar los campos en los input para su proxima edicion
  ActivoId(activo:Activo, content : any): void {
    this.btnEditar = false;
    this.btnGuardar = true;
    this.modalService.open(content,{size:'lg'});

    this.servicioActivo.getActivoId(activo).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          inventario: res[0].inventario,
          descripcion: res[0].descripcion,
          marca: res[0].marca,
          modelo: res[0].modelo,
          serie: res[0].serie,
          hostname: res[0].hostname,
          dpi: res[0].dpi,
          ip: res[0].ip,
          estado: res[0].estado,
        });

      },
      (error) => {
        console.log();
      }
    );
  }

  // Editar Activo ya obtenido por el ID
  editarActivoId(): void {
      this.servicioActivo.editarActivo(this.formularioRegistro.value, this.formularioRegistro.value.id)
      .subscribe(
        (res) => {
          console.log(res)
          this.alertas.alertedit();
          this.getActivos();
          this.cerrarModal();
        },
        (error) => {
          console.log(error)
          this.alertas.alerterror();
        }
      );
  }

   // Eliminar alumno enviado por id
   eliminarActivo(activo: Activo): void {

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
        this.servicioActivo.eliminarActivo(activo.id).subscribe(
          (res) => {
          this.getActivos();
    });
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }

    });
}
// Busqueda de acompañantes por alumno
busquedaActivo(): void{
  if (this.buscar_activo== ""){
    this.alertas.alertcampos();
  }else{
    this.servicioActivo.busquedaActivo(this.buscar_activo).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
        }else{
          this.alertas.alertLoadingError();
        }
        this.listadoActivos= res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}

// Funcion para cancelar busqueda por alumno
cancelarbusquedaActivo(): void {
  this.getActivos();
  this.buscar_activo = "";
}

 // Funcion cancelar solo para borrar los valores de formulario reactivo
 cancelar(): void{
  this.formularioRegistro.reset();
}


}
