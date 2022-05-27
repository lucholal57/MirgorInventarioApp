import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ActivoStandar } from 'src/app/entidades/activos/activo_standar/activo-standar';
import { ActivoStandarService } from 'src/app/services/activos/activo_standar/activo-standar.service';

@Component({
  selector: 'app-activo-standar',
  templateUrl: './activo-standar.component.html',
  styleUrls: ['./activo-standar.component.css'],
})
export class ActivoStandarComponent implements OnInit {
  p: number = 1;
  //Array de activos celulares
  listadoActivoStandar: ActivoStandar[] = [];
  //Buscar activo
  buscar_activo = '';
  // Variables Botones
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;

  constructor(
    private servicioActivoStandar: ActivoStandarService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private alertas: AlertService
  ) {}

  ngOnInit(): void {
    this.getActivoStandar();
  }

  //Formulario reactivo para el registro de datos+
  formularioRegistro = this.formBuilder.group({
    id: [''],
    inventario: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    serie: ['', [Validators.required]],
    hostname: ['', [Validators.required]],
    ip: ['', [Validators.required]],
    mac: ['', [Validators.required]],
    area: ['', [Validators.required]],
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

  //Get Activos Standar
  getActivoStandar(): void {
    this.servicioActivoStandar.getActivoStandar().subscribe(
      (res) => {
        this.listadoActivoStandar = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarActivoStandar(): void {
    this.servicioActivoStandar
      .validacionInventario(this.formularioRegistro.value.inventario)
      .subscribe((res) => {
        if (res.length == 0) {
          if (this.formularioRegistro.valid) {
            this.servicioActivoStandar
              .registrarActivoStandar(this.formularioRegistro.value)
              .subscribe(
                (res) => {
                  console.log(res);
                  this.cerrarModal();
                  this.getActivoStandar();
                  this.alertas.alertsuccess();
                },
                (error) => {
                  console.log(error);
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

  ActivoStandarId(activo_standar: ActivoStandar, content: any): void {
    this.formularioRegistro.controls['inventario'].disable();
    this.btnEditar = false;
    this.btnGuardar = true;
    this.modalService.open(content, { size: 'lg' });
    this.servicioActivoStandar.getActivoStandarId(activo_standar).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          inventario: res[0].inventario,
          descripcion: res[0].descripcion,
          marca: res[0].marca,
          modelo: res[0].modelo,
          serie: res[0].serie,
          hostname: res[0].hostname,
          ip: res[0].ip,
          mac: res[0].mac,
          area: res[0].area,
          estado: res[0].estado,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarActivoStandar(): void {
    this.formularioRegistro.controls['inventario'].enable();
    this.servicioActivoStandar
      .editarActivoStandar(
        this.formularioRegistro.value,
        this.formularioRegistro.value.id
      )
      .subscribe(
        (res) => {
          this.alertas.alertedit();
          this.getActivoStandar();
          this.cerrarModal();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }

  eliminarActivoStandar(activo_standar: ActivoStandar): void {
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
        this.servicioActivoStandar
          .eliminarActivoStandar(activo_standar.id)
          .subscribe((res) => {
            this.getActivoStandar();
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
      this.servicioActivoStandar.busquedaActivo(this.buscar_activo).subscribe(
        (res) => {
          console.log(res);
          if (res.length != 0) {
            this.alertas.alertLoading();
          } else {
            this.alertas.alertLoadingError();
          }
          this.listadoActivoStandar = res;
        },
        (error) => {
          this.alertas.alerterror();
        }
      );
    }
  }

  // Funcion para cancelar busqueda por alumno
  cancelarbusquedaActivo(): void {
    this.getActivoStandar();
    this.buscar_activo = '';
  }
}
