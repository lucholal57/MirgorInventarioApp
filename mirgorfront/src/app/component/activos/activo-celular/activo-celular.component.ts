import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivoCelular } from 'src/app/entidades/activos/activo_celular/activo-celular';
import { ActivoCelularService } from 'src/app/services/activos/activo_celular/activo-celular.service';
import { AlertService } from '../../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-activo-celular',
  templateUrl: './activo-celular.component.html',
  styleUrls: ['./activo-celular.component.css'],
})
export class ActivoCelularComponent implements OnInit {
  p: number = 1;
  //Array de activos celulares
  listadoActivoCelular: ActivoCelular[] = [];
  //Buscar activo
  buscar_activo = '';
  // Variables Botones
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;

  constructor(
    private servicioActivoCelular: ActivoCelularService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private alertas: AlertService,
    private router:Router
  ) {}

  ngOnInit(): void {
    if(localStorage.length!=0){
    this.getActivoCelular();
    }else{
      this.alertas.alertToken();
      setTimeout(() => {this.router.navigate(['']);},2000)
    }
  }

  //Formulario registro
  formularioRegistro = this.formBuilder.group({
    id: [''],
    imei: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
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

  // Get CElulares
  getActivoCelular(): void {
    this.servicioActivoCelular.getActivoCelular().subscribe(
      (res) => {
        this.listadoActivoCelular = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //Registrar Activos Celulares
  registrarActivoCelular(): void {
    this.servicioActivoCelular
      .validacionInventario(this.formularioRegistro.value.imei)
      .subscribe((res) => {
        if (res.length == 0) {
          if (this.formularioRegistro.valid) {
            this.servicioActivoCelular
              .registrarActivoCelular(this.formularioRegistro.value)
              .subscribe(
                (res) => {
                  console.log(res);
                  this.cerrarModal();
                  this.getActivoCelular();
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
          this.formularioRegistro.controls['imei'].reset();
        }
      });
  }

  //Obtenemos  en el modal por ID los datos del celular seleccionado para poder editarlo
  ActivoCelularId(activo_celular: ActivoCelular, content: any): void {
    this.formularioRegistro.controls['imei'].disable();
    this.btnEditar = false;
    this.btnGuardar = true;
    this.modalService.open(content, { size: 'lg' });
    this.servicioActivoCelular.getActivoCelularId(activo_celular).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          imei: res[0].imei,
          marca: res[0].marca,
          modelo: res[0].modelo,
          estado: res[0].estado,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Editamos el celular selecciodo
  editarActivoCelular(): void {
    this.formularioRegistro.controls['imei'].enable();
    this.servicioActivoCelular
      .editarActivoCelular(
        this.formularioRegistro.value,
        this.formularioRegistro.value.id
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getActivoCelular();
          this.cerrarModal();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }

  // Eliminar Activo Celular por ID
  eliminarActivoCelular(activo_celular: ActivoCelular): void {
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
        this.servicioActivoCelular
          .eliminarActivoCelular(activo_celular.id)
          .subscribe((res) => {
            this.getActivoCelular();
          });
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }
    });
  }

  // Busqueda de acompañantes por alumno
  busquedaActivo(): void {
    if (this.buscar_activo == '') {
      this.alertas.alertcampos();
    } else {
      this.servicioActivoCelular.busquedaActivo(this.buscar_activo).subscribe(
        (res) => {
          console.log(res);
          if (res.length != 0) {
            this.alertas.alertLoading();
          } else {
            this.alertas.alertLoadingError();
             //Si no encuentra datos se limpia el input y despues del msj de sin coincidencia en busqueda trar todos los usuarios nuevamente, evitando tener que apretar cancelar para volver a listar
             this.buscar_activo="";
             //Funcion para setear funcion despues de cierto intervalo
             setTimeout(() => {this.getActivoCelular()},1800)
          }
          this.listadoActivoCelular = res;
        },
        (error) => {
          this.alertas.alerterror();
        }
      );
    }
  }

  // Funcion para cancelar busqueda por alumno
  cancelarbusquedaActivo(): void {
    this.getActivoCelular();
    this.buscar_activo = '';
  }

  // Funcion cancelar solo para borrar los valores de formulario reactivo
  cancelar(): void {
    this.formularioRegistro.reset();
  }
}
