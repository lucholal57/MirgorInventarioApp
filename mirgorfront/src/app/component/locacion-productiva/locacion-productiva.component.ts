import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocacionProductiva} from 'src/app/entidades/locacion-productiva/locacion-productiva';
import { LocacionProductivaService } from 'src/app/services/locacion-productiva/locacion-productiva.service';
//Agregar las alertas aqui
import { AlertService} from '../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Activo } from 'src/app/entidades/activos/activo_industrial/activo';
import { ActivoStandar } from 'src/app/entidades/activos/activo_standar/activo-standar';
import { ActivoGeneral } from 'src/app/entidades/activos/activo_general/activo-general';
import { ActivoService } from 'src/app/services/activos/activo_industrial/activo.service';
import { ActivoStandarService } from 'src/app/services/activos/activo_standar/activo-standar.service';
import { ActivoGeneralService } from 'src/app/services/activos/activo_general/activo-general.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown'

@Component({
  selector: 'app-locacion-productiva',
  templateUrl: './locacion-productiva.component.html',
  styleUrls: ['./locacion-productiva.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class LocacionProductivaComponent implements OnInit {
  p:number = 1;
  //Array de Locacions
  listadoLocacionesProductivas :LocacionProductiva[] =[];
  //Array de activos varios
  listadoActivoIndustrial :Activo[] =[];
  listadoActivoStandar : ActivoStandar[]=[];
  listadoActivoGeneral : ActivoGeneral[]=[];


  dropdownSettings: IDropdownSettings;
  //Buscar
  buscar_locacion = "";
    // Variables Botones
    public btnGuardar = false;
    public btnEditar = false;
    public btnCancelar = false;
    //Filtro para Pipe (Todavia sin funcionar)
    LocacionFiltro="";

  constructor(
    private servicioLocacionProductiva : LocacionProductivaService,
    private servicioActivoIndustrial: ActivoService,
    private servicioActivoStandar : ActivoStandarService,
    private servicioActivoGeneral: ActivoGeneralService,
    private formBuilder : FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private alertas : AlertService
  ) { }

  ngOnInit(): void {
    this.getLocacionesProductivas();
    this.getActivosTotales();
    this.dropdownSettings= {
      singleSelection: true,
      idField: 'id',
      textField: 'inventario',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    this.formularioRegistro.controls['activo_industrial'].setValue(null)
    this.formularioRegistro.controls['activo_general'].setValue(null)
    this.formularioRegistro.controls['activo_standar'].setValue(null)
  }

  //Formulario Registro
  formularioRegistro= this.formBuilder.group({
    id:[''],
    sitio:['',[Validators.required]],
    linea:['',[Validators.required]],
    puesto:['',[Validators.required]],
    activo_industrial:[''],
    fecha:['',[Validators.required]],
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
    //Get locaciones productivas
    getLocacionesProductivas(): void {
      this.servicioLocacionProductiva.getLocacionesProductivas().subscribe(
        (res) => {
          this.listadoLocacionesProductivas = res;
          console.log(this.listadoLocacionesProductivas)
        }
      )
    }
// Get Activos para listar
    getActivosTotales(): void{
      this.servicioActivoIndustrial.getActivos().subscribe(
        (res) => {
          this.listadoActivoIndustrial = res;
        },
        (error) => {
          console.log(error)
        }

      )
  }
  //Registrar Locaciones Productivas
  registrarLocacionesProductivas():void {
    this.asignarValoresFormulario();
    if(this.formularioRegistro.valid) {
      this.servicioLocacionProductiva.registrarLocacionProductiva(this.formularioRegistro.value).subscribe(
        (res) => {
          this.cerrarModal();
          this.getLocacionesProductivas();
          this.alertas.alertsuccess();
        },
        (error) => {
          this.alertas.alerterror();
        }
      )
    }else{ this.alertas.alertcampos(); }
  }
  // Obtener locacion por id para mostrar en modal
  LocacionProductivaId(locacion_productiva : LocacionProductiva, content : any): void {
    this.btnEditar = false;
    this.btnGuardar = true;
    this.modalService.open(content,{size:'lg'});
    this.servicioLocacionProductiva.getLocacionProductivaId(locacion_productiva).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          sitio: res[0].sitio,
          linea: res[0].linea,
          puesto: res[0].puesto,
          activo_industrial: res[0].activo_industrial,
          fecha: res[0].fecha,
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // Editar Locacion PRoductiva ya obtenido por el ID
  editarLocacionProductivaId(): void {
    console.log(this.formularioRegistro.value.activo_industrial,"resss")

    this.asignarValoresFormulario();
    this.servicioLocacionProductiva.editarLocacionProductiva(this.formularioRegistro.value, this.formularioRegistro.value.id).subscribe(
      (res) => {
        this.alertas.alertedit();
        this.getLocacionesProductivas();
        this.cerrarModal();
      },
      (error) => {
        this.alertas.alerterror();
      }
    );

  }
  //Eliminar locacion Productiva
  eliminarLocacionProductiva(locacion_productiva: LocacionProductiva): void {
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
        this.servicioLocacionProductiva.eliminarLocacionProductiva(locacion_productiva.id).subscribe(
          (res) => {
          this.getLocacionesProductivas();
    });
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }

    });
  }


// Funcion para cancelar busqueda por alumno
cancelarbusquedaLocacion(): void {
  this.getLocacionesProductivas();
  this.buscar_locacion = "";
}

 // Funcion cancelar solo para borrar los valores de formulario reLocacion
 cancelar(): void{
  this.formularioRegistro.reset();
}

asignarValoresFormulario(): void{
  if(this.formularioRegistro.value.activo_industrial != null)
    {
      this.formularioRegistro.controls['activo_industrial'].setValue(this.formularioRegistro.value.activo_industrial[0]['id'])
    }
}

}
