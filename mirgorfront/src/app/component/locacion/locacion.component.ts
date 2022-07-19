import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
import { TrazabilidadService } from 'src/app/services/trazabilidad/trazabilidad.service';
import {Router} from '@angular/router';


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
  dropdownSettingsActivos: IDropdownSettings;
  //Buscar
  filtro_busqueda="";
  valor_busqueda="";
  buscar_locacion = "";
    // Variables Botones
    public btnGuardar = false;
    public btnEditar = false;
    public btnCancelar = false;
    public btnMover = false;
    //Variablepara ocualta los select en el formulario, en el momento que movemos un activo de ubicacion
    public hidenMover:boolean = true;

    LocacionFiltro="";
    //Arrays para poder hacer el patchvalue con libreria ngdropdown
    industrial:Activo[]=[];
    general=[];
    standar=[];
    celular=[];
    notebook=[];

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
    private servicioTrazabilidad : TrazabilidadService,
    private router:Router
    ) { }

  ngOnInit(): void {
   if(localStorage.length!=0){
    this.getLocaciones();
    this.getActivosTotales();
    this.dropdownSettings= {
      singleSelection: true,
      idField: 'id',
      textField: 'imei',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.dropdownSettingsActivos= {
      singleSelection: true,
      idField: 'id',
      textField: 'inventario',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

  //Seteamos de inicio los select de Dropdown.
  this.formularioRegistro.controls['activo_industrial'].setValue("")
  this.formularioRegistro.controls['activo_general'].setValue("")
  this.formularioRegistro.controls['activo_standar'].setValue("")
  this.formularioRegistro.controls['activo_notebook'].setValue("")
  this.formularioRegistro.controls['activo_celular'].setValue("")
  console.log(this.formularioRegistro.value)
  }else{
    this.alertas.alertToken();
    setTimeout(() => {this.router.navigate(['']);},2000)
  }

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
    unidad_negocio:['', [Validators.required]],
    nave: ['', [Validators.required]],
    fecha:['',[Validators.required]],
  })

  //Open funcion para abrir ventana modal
  open(content:any) {
    this.modalService.open(content,{size:'lg',backdrop: 'static'});
    this.btnGuardar=false;
    this.btnEditar=true;
    this.btnMover=true;
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
    this.asignarValoresFormulario();
    this.industrial=[];
    this.general=[];
    this.standar=[];
    this.celular=[];
    this.notebook = [];
    this.btnMover=true;
    this.btnEditar = false;
    this.btnGuardar = true;
    this.modalService.open(content,{size:'lg'});
    this.servicioLocacion.getLocacionId(locacion).subscribe(
      (res) => {
        this.industrial.push(res[0].activo_industrial);
        this.standar.push(res[0].activo_standar);
        this.general.push(res[0].activo_general);
        this.notebook.push(res[0].activo_notebook);
        this.celular.push(res[0].activo_celular);
        this.formularioRegistro.patchValue({
          id: res[0].id,
          sitio: res[0].sitio,
          area: res[0].area,
          localizacion: res[0].localizacion,
          activo_industrial: this.industrial,
          activo_standar: this.standar,
          activo_general: this.general,
          activo_notebook: this.notebook,
          activo_celular: this.celular,
          unidad_negocio: res[0].unidad_negocio,
          nave: res[0].nave,
          fecha: res[0].fecha,
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
    console.log("Estop manda al editar ",this.formularioRegistro.value)
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
   eliminarLocacion(locacion: Locacion): void {
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
        this.servicioLocacion.eliminarLocacion(locacion.id).subscribe(
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

//Asignacion de formulario ya que con la libreria ng dropdown de angular, nustro array se convierte en objeto entonces tenemos que setear el id para que pueda mandarlo a la api
asignarValoresFormulario(): void{
  var arraynull=[null]
    if(this.formularioRegistro.value.activo_industrial != "" )
      {
        this.formularioRegistro.controls['activo_industrial'].setValue(this.formularioRegistro.value.activo_industrial[0]['id'])
      }
    if(this.formularioRegistro.get('activo_celular').value !="")
    {console.log("valor formulario", this.formularioRegistro.get('activo_celular').value)
     console.log("array null",arraynull)
      this.formularioRegistro.controls['activo_celular'].setValue(this.formularioRegistro.value.activo_celular[0]['id'])
    }
    if(this.formularioRegistro.value.activo_general != "")
    {
      this.formularioRegistro.controls['activo_general'].setValue(this.formularioRegistro.value.activo_general[0]['id'])
    }
    if(this.formularioRegistro.value.activo_notebook != "")
    {
      this.formularioRegistro.controls['activo_notebook'].setValue(this.formularioRegistro.value.activo_notebook[0]['id'])
    }
    if(this.formularioRegistro.value.activo_standar != "")
    {
      this.formularioRegistro.controls['activo_standar'].setValue(this.formularioRegistro.value.activo_standar[0]['id'])
    }
}

moverEdicionActivo(locacion:Locacion, content : any): void{
  var industrial=[];
  var general=[];
  var standar=[];
  var celular=[];
  var notebook = [];
  this.btnEditar = true;
    this.btnGuardar = true;
    this.btnMover = false;
    this.modalService.open(content,{size:'lg'});
    this.servicioLocacion.getLocacionId(locacion).subscribe(
      (res) => {
        industrial.push(res[0].activo_industrial);
        general.push(res[0].activo_general);
        standar.push(res[0].activo_standar);
        notebook.push(res[0].activo_notebook);
        celular.push(res[0].activo_celular);
        this.formularioRegistro.patchValue({
          id: res[0].id,
          sitio: res[0].sitio,
          area: res[0].area,
          localizacion: res[0].localizacion,
          activo_industrial: res[0].activo_industrial,
          activo_standar: res[0].activo_standar,
          activo_general: res[0].activo_general,
          activo_notebook: res[0].activo_notebook,
          activo_celular: res[0].activo_celular,
          unidad_negocio: res[0].unidad_negocio,
          nave: res[0].nave,
          fecha: res[0].fecha,
        });
      },
      (error) => {
      }
    );
}

//Se crea un objeto con las caracteristicas de trazavilidad solo para tener un registro.
moverActivo(): void{
  this.editarLocacionId();
  var trazabilidad={
    "locacion":this.formularioRegistro.value.id,
    "locacion_productiva":null,
    "sitio": this.formularioRegistro.value.sitio,
    "unidad_negocio": this.formularioRegistro.value.unidad_negocio,
    "area": this.formularioRegistro.value.area,
    "localizacion":this.formularioRegistro.value.localizacion,
    "nave":this.formularioRegistro.value.nave,
    "fecha":this.formularioRegistro.value.fecha
  }
  console.log("valores trazabilidad",trazabilidad)
  this.servicioTrazabilidad.registrarTrazabilidad(trazabilidad).subscribe(
    (res) => {
      console.log(this.formularioRegistro.value)
      console.log(res)
      alert("Exito al registrar")
    }
  )

}

}

