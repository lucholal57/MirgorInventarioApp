import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivoNotebook } from 'src/app/entidades/activos/activo_notebook/activo-notebook';
import { ActivoNotebookService } from 'src/app/services/activos/activo_notebook/activo-notebook.service';
import { AlertService } from '../../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activo-notebook',
  templateUrl: './activo-notebook.component.html',
  styleUrls: ['./activo-notebook.component.css'],
})
export class ActivoNotebookComponent implements OnInit {
  p: number = 1;
  //Array de activos celulares
  listadoActivoNotebook: ActivoNotebook[] = [];
  //Buscar activo
  buscar_activo = '';
  // Variables Botones
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;

  constructor(
    private servicioActivoNotebook: ActivoNotebookService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private alertas: AlertService
  ) {}

  ngOnInit(): void {
    this.getActivoNotebook();
  }

  //Formulario reactiovo para el registro
  formularioRegistro = this.formBuilder.group({
    id: [''],
    inventario: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    serie: ['', [Validators.required]],
    hostname: ['', [Validators.required]],
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

  getActivoNotebook(): void {
    this.servicioActivoNotebook.getActivoNotebook().subscribe(
      (res) => {
        this.listadoActivoNotebook = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarActivoNotebook(): void {
    this.servicioActivoNotebook
      .validacionInventario(this.formularioRegistro.value.inventario)
      .subscribe((res) => {
        if (res.length == 0) {
          if (this.formularioRegistro.valid) {
            this.servicioActivoNotebook
              .registrarActivoNotebook(this.formularioRegistro.value)
              .subscribe(
                (res) => {
                  console.log(res);
                  this.cerrarModal();
                  this.getActivoNotebook();
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

  ActivoNotebookId(activo_notebook: ActivoNotebook, content: any): void {
    this.formularioRegistro.controls['inventario'].disable();
    this.btnEditar = false;
    this.btnGuardar = true;
    this.modalService.open(content, { size: 'lg' });
    this.servicioActivoNotebook.getActivoNotebookId(activo_notebook).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          inventario: res[0].inventario,
          marca: res[0].marca,
          modelo: res[0].modelo,
          serie: res[0].serie,
          hostname: res[0].hostname,
          estado: res[0].estado,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarActivoNotebook(): void {
    this.formularioRegistro.controls['inventario'].enable();
    this.servicioActivoNotebook
      .editarActivoNotebook(
        this.formularioRegistro.value,
        this.formularioRegistro.value.id
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getActivoNotebook();
          this.cerrarModal();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }

  eliminarActivoNotebook(activo_notebook: ActivoNotebook): void {
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
        this.servicioActivoNotebook
          .eliminarActivoNotebook(activo_notebook.id)
          .subscribe((res) => {
            this.getActivoNotebook();
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
      this.servicioActivoNotebook.busquedaActivo(this.buscar_activo).subscribe(
        (res) => {
          console.log(res);
          if (res.length != 0) {
            this.alertas.alertLoading();
          } else {
            this.alertas.alertLoadingError();
          }
          this.listadoActivoNotebook = res;
        },
        (error) => {
          this.alertas.alerterror();
        }
      );
    }
  }

  // Funcion para cancelar busqueda por alumno
  cancelarbusquedaActivo(): void {
    this.getActivoNotebook();
    this.buscar_activo = '';
  }

  // Funcion cancelar solo para borrar los valores de formulario reactivo
  cancelar(): void {
    this.formularioRegistro.reset();
  }
}
