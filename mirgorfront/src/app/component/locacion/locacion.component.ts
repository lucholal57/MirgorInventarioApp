import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Locacion } from 'src/app/entidades/locacion/locacion';
import { LocacionService } from 'src/app/services/locacion/locacion.service';
//Agregar las alertas aqui
import { AlertService} from '../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Activo } from 'src/app/entidades/activos/activo_industrial/activo';
import { ActivoStandar } from 'src/app/entidades/activos/activo_standar/activo-standar';
import { ActivoCelular } from 'src/app/entidades/activos/activo_celular/activo-celular';
import { ActivoNotebook } from 'src/app/entidades/activos/activo_notebook/activo-notebook';
import { ActivoGeneral } from 'src/app/entidades/activos/activo_general/activo-general';
import { ActivoService } from 'src/app/services/activos/activo_industrial/activo.service';
import { ActivoStandarService } from 'src/app/services/activos/activo_standar/activo-standar.service';
import { ActivoCelularService } from 'src/app/services/activos/activo_celular/activo-celular.service';
import { ActivoNotebookService } from 'src/app/services/activos/activo_notebook/activo-notebook.service';
import { ActivoGeneralService } from 'src/app/services/activos/activo_general/activo-general.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown'



@Component({
  selector: 'app-Locacion',
  templateUrl: './Locacion.component.html',
  styleUrls: ['./Locacion.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class LocacionComponent implements OnInit {
  p:number = 1;
  //Array de Locacions
  listadoLocaciones :Locacion[] =[];
  //Array de activos varios
  listadoActivoIndustrial :Activo[] =[];
  listadoActivoStandar : ActivoStandar[]=[];
  listadoActivoCelular : ActivoCelular[]=[];
  listadoActivoNotebook : ActivoNotebook[]=[];
  listadoActivoGeneral : ActivoGeneral[]=[];

  dropdownSettings: IDropdownSettings;
  //Buscar
  buscar_locacion = "";
    // Variables Botones
    public btnGuardar = false;
    public btnEditar = false;
    public btnCancelar = false;

    LocacionFiltro="";

  constructor(
    private servicioLocacion: LocacionService,
    private servicioActivoIndustrial: ActivoService,
    private servicioActivoStandar : ActivoStandarService,
    private servicioActivoCelular: ActivoCelularService,
    private servicioActivoNotebook: ActivoNotebookService,
    private servicioActivoGeneral: ActivoGeneralService,
    private formBuilder : FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private alertas : AlertService,
    ) { }

  ngOnInit(): void {
    this.getLocaciones();
    this.getActivosTotales();
    this.dropdownSettings= {
      singleSelection: true,
      idField: 'id',
      textField: 'inventario',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.formularioRegistro.controls['activo_industrial'].setValue(null)
    this.formularioRegistro.controls['activo_celular'].setValue(null)
    this.formularioRegistro.controls['activo_notebook'].setValue(null)
    this.formularioRegistro.controls['activo_general'].setValue(null)
    this.formularioRegistro.controls['activo_standar'].setValue(null)

  }


  //Formulario Registro
  formularioRegistro= this.formBuilder.group({
    id:[''],
    sitio:['',[Validators.required]],
    area:['',[Validators.required]],
    localizacion:['',[Validators.required]],
    activo_celular:[''],
    activo_notebook:[''],
    activo_general:[''],
    activo_standar:[''],
    activo_industrial:[''],
  })

  //Open funcion para abrir ventana modal
  open(content:any) {
    this.modalService.open(content,{size:'lg',backdrop: 'static'});
    this.btnGuardar=false;
    this.btnEditar=true;

    console.log(this.listadoActivoIndustrial)
    console.log(this.formularioRegistro.value.activo_celular,'Act celular')
    console.log(this.formularioRegistro.value.activo_industrial,'Act indus')
    console.log(this.formularioRegistro.value.activo_general,'Act gene')
    console.log(this.formularioRegistro.value.activo_standar,'Act standar')

  }
  // Funcion para cerrar ventana modal
  cerrarModal(): void{
    this.modalService.dismissAll();
    this.formularioRegistro.reset();
  }

  getLocaciones(): void{
    this.servicioLocacion.getLocaciones().subscribe(
      (res) => {
        this.listadoLocaciones = res;
      },
    (error) => {
      console.log(error)
    }
    )
  }

  getActivosTotales(): void{
      this.servicioActivoIndustrial.getActivos().subscribe(
        (res) => {
          this.listadoActivoIndustrial = res;
        },
        (error) => {
          console.log(error)
        }

      )
      this.servicioActivoCelular.getActivoCelular().subscribe(
        (res) => {
          this.listadoActivoCelular = res;
        },
        (error) => {
          console.log(error)
        }
      )
      this.servicioActivoNotebook.getActivoNotebook().subscribe(
        (res) => {
          this.listadoActivoNotebook =res;
        },
        (error) => {
          console.log(error)
        }
      )
      this.servicioActivoGeneral.getActivoGeneral().subscribe(
        (res) => {
          this.listadoActivoGeneral=res;
        },
        (error) => {
          console.log(error)
        }
      )
      this.servicioActivoStandar.getActivoStandar().subscribe(
        (res) => {
          this.listadoActivoStandar=res;
        },
        (error) => {
          console.log(error)
        }
      )

  }

  registrarLocaciones():void{
this.asignarValoresFormulario();
    if(this.formularioRegistro.valid)
    {
      this.servicioLocacion.registrarLocacion(this.formularioRegistro.value).subscribe(
        (res) => {
          console.log(res)
          this.cerrarModal();
          this.getLocaciones();
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

  }

  // Obtener Locacion por id para mostrar los campos en los input para su proxima edicion
  LocacionId(locacion:Locacion, content : any): void {
    console.log(this.formularioRegistro.value,'formulario para la edicion')
    this.btnEditar = false;
    this.btnGuardar = true;
    this.modalService.open(content,{size:'lg'});
    this.servicioLocacion.getLocacionId(locacion).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          sitio: res[0].sitio,
          area: res[0].area,
          localizacion: res[0].localizacion,
          activo_industrial: res[0].activo_industrial,
          activo_standar: res[0].activo_standar,
          activo_general: res[0].activo_general,
          activo_notebook: res[0].activo_notebook,
          activo_celular: res[0].activo_celular
        });

      },
      (error) => {
        console.log();
      }
    );
  }

  // Editar Locacion ya obtenido por el ID
  editarLocacionId(): void {
    this.asignarValoresFormulario()
      this.servicioLocacion.editarLocacion(this.formularioRegistro.value, this.formularioRegistro.value.id)
      .subscribe(
        (res) => {
          console.log(res)
          this.alertas.alertedit();
          this.getLocaciones();
          this.cerrarModal();
        },
        (error) => {
          console.log(error)
          this.alertas.alerterror();
        }
      );
  }

   // Eliminar alumno enviado por id
   eliminarLocacion(Locacion: Locacion): void {

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
        this.servicioLocacion.eliminarLocacion(Locacion.id).subscribe(
          (res) => {
          this.getLocaciones();
    });
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }

    });
}
// Busqueda de acompañantes por alumno
busquedaLocacion(): void{
  if (this.buscar_locacion== ""){
    this.alertas.alertcampos();
  }else{
    this.servicioLocacion.busquedaLocacion(this.buscar_locacion).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
        }else{
          this.alertas.alertLoadingError();
        }
        this.listadoLocaciones= res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}

// Funcion para cancelar busqueda por alumno
cancelarbusquedaLocacion(): void {
  this.getLocaciones();
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
    if(this.formularioRegistro.value.activo_celular != null)
    {
      this.formularioRegistro.controls['activo_celular'].setValue(this.formularioRegistro.value.activo_celular[0]['id'])
    }
    if(this.formularioRegistro.value.activo_general!= null)
    {
      this.formularioRegistro.controls['activo_general'].setValue(this.formularioRegistro.value.activo_general[0]['id'])
    }
    if(this.formularioRegistro.value.activo_notebook!= null)
    {
      this.formularioRegistro.controls['activo_notebook'].setValue(this.formularioRegistro.value.activo_notebook[0]['id'])
    }
    if(this.formularioRegistro.value.activo_standar!= null)
    {
      this.formularioRegistro.controls['activo_standar'].setValue(this.formularioRegistro.value.activo_standar[0]['id'])
    }

}

}
