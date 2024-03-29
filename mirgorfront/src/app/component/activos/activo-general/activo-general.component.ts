import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ActivoGeneral } from 'src/app/entidades/activos/activo_general/activo-general';
import { ActivoGeneralService } from 'src/app/services/activos/activo_general/activo-general.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-activo-general',
  templateUrl: './activo-general.component.html',
  styleUrls: ['./activo-general.component.css'],
})
export class ActivoGeneralComponent implements OnInit {
  p: number = 1;
  //Array de activos celulares
  listadoActivoGeneral: ActivoGeneral[] = [];
  //Buscar activo
  buscar_activo = '';
  // Variables Botones
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;

  constructor(
    private servicioActivoGeneral: ActivoGeneralService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private alertas: AlertService,
    private router:Router
  ) {}

  ngOnInit(): void {
    if(localStorage.length!=0){
      this.getActivoGeneral();
    }else{
      this.alertas.alertToken();
      setTimeout(() => {this.router.navigate(['']);},2000)
    }
  }

  //Formulario Reactivo para el registro de activos generales
  formularioRegistro = this.formBuilder.group({
    id: [''],
    inventario: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    serie: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  });

  //Open funcion para abrir ventana modal
  open(content: any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static' });
    this.btnGuardar = false;
    this.btnEditar = true;
  }
  // Funcion para cerrar ventana modal
  cerrarModal(): void {
    this.modalService.dismissAll();
    this.formularioRegistro.reset();
  }
  //Get Activos Generales
  getActivoGeneral(): void {
    this.servicioActivoGeneral.getActivoGeneral().subscribe(
      (res) => {
        this.listadoActivoGeneral = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarActivoGeneral(): void {
    this.servicioActivoGeneral
      .validacionInventario(this.formularioRegistro.value.inventario)
      .subscribe((res) => {
        if (res.length == 0) {
          if (this.formularioRegistro.valid) {
            this.servicioActivoGeneral
              .registrarActivoGeneral(this.formularioRegistro.value)
              .subscribe(
                (res) => {
                  console.log(res);
                  this.cerrarModal();
                  this.getActivoGeneral();
                  this.alertas.alertsuccess();
                },
                (error) => {
                  this.alertas.alerterror();
                }
              );
          } else {
            this.alertas.alertcampos();
          }
        } else {
          this.alertas.alertActivoExistente();
          this.formularioRegistro.controls['inventario'].reset();
        }
      });
  }

  ActivoGeneralId(activo_general: ActivoGeneral, content: any): void {
    this.formularioRegistro.controls['inventario'].disable();
    this.btnEditar = false;
    this.btnGuardar = true;
    this.modalService.open(content, { size: 'lg' });
    this.servicioActivoGeneral.getActivoGeneralId(activo_general).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          inventario: res[0].inventario,
          descripcion: res[0].descripcion,
          marca: res[0].marca,
          modelo: res[0].modelo,
          serie: res[0].serie,
          estado: res[0].estado,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarActivoGeneral(): void {
    this.formularioRegistro.controls['inventario'].enable();
    this.servicioActivoGeneral
      .editarActivoGeneral(
        this.formularioRegistro.value,
        this.formularioRegistro.value.id
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getActivoGeneral();
          this.cerrarModal();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }

  eliminarActivoGeneral(activo_general: ActivoGeneral): void {
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
        this.servicioActivoGeneral
          .eliminarActivoGeneral(activo_general.id)
          .subscribe((res) => {
            this.getActivoGeneral();
          });
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }
    });
  }

  // Funcion cancelar solo para borrar los valores de formulario reactivo
  cancelar(): void {
    this.formularioRegistro.reset();
  }

  // Busqueda de acompañantes por alumno
  busquedaActivo(): void {
    if (this.buscar_activo == '') {
      this.alertas.alertcampos();
    } else {
      this.servicioActivoGeneral.busquedaActivo(this.buscar_activo).subscribe(
        (res) => {
          console.log(res);
          if (res.length != 0) {
            this.alertas.alertLoading();
          } else {
            this.alertas.alertLoadingError();
             //Si no encuentra datos se limpia el input y despues del msj de sin coincidencia en busqueda trar todos los usuarios nuevamente, evitando tener que apretar cancelar para volver a listar
             this.buscar_activo="";
             //Funcion para setear funcion despues de cierto intervalo
             setTimeout(() => {this.getActivoGeneral()},1800)
          }
          this.listadoActivoGeneral = res;
        },
        (error) => {
          this.alertas.alerterror();
        }
      );
    }
  }

  // Funcion para cancelar busqueda por alumno
  cancelarbusquedaActivo(): void {
    this.getActivoGeneral();
    this.buscar_activo = '';
  }
}
