import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../entidades/usuario/usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { AlertService } from '../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivoNotebook } from 'src/app/entidades/activos/activo_notebook/activo-notebook';
import { ActivoCelular } from 'src/app/entidades/activos/activo_celular/activo-celular';
import { ActivoCelularService } from 'src/app/services/activos/activo_celular/activo-celular.service';
import { ActivoNotebookService } from 'src/app/services/activos/activo_notebook/activo-notebook.service';
import { LineaTelefonica } from 'src/app/entidades/linea_telefonica/linea-telefonica';
import { LineaTelefonicaService } from 'src/app/services/linea_telefonica/linea-telefonica.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class UsuarioComponent implements OnInit {
  p: number = 1;
  listadoUsuario: Usuario[] = [];
  listadoActivoCelular: ActivoCelular[] = [];
  listadoActivoNotebook: ActivoNotebook[] = [];
  listadoLineaTelefonica: LineaTelefonica[] = [];
  //Buscar Usuario por nombre
  buscar_usuario = '';
  //Variable para vilidar existencia
  validacion = [];

  dropdownSettings: IDropdownSettings;
  dropdownSettingsNotebook: IDropdownSettings;
  dropdownSettingsLineaTelefonica: IDropdownSettings;
  // Variables Botones
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;

  constructor(
    private servicioUsuario: UsuarioService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private servicioActivoCelular: ActivoCelularService,
    private servicioActivoNotebook: ActivoNotebookService,
    private servicioLineaTelefonica: LineaTelefonicaService,
    private alertas: AlertService,
    private router:Router
  ) {}

  ngOnInit(): void {
    //Validamos que al iniciar o recargar la pagina nos devuelva el token, con length validamos cantidad, si es distinto de 0 nos rederegira al componente con exito, de ser igual a 0 nos redirigira al componente login diciendo que no iniciamos sesion.
    if(localStorage.length!=0)
    {
    this.getUsuario();
    this.getActivosTotales();
    this.getLineaTelefonicas();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'imei',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    this.dropdownSettingsNotebook = {
      singleSelection: true,
      idField: 'id',
      textField: 'inventario',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    this.dropdownSettingsLineaTelefonica = {
      singleSelection: true,
      idField: 'id',
      textField: 'numero',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    this.formularioRegistro.controls['activo_celular'].setValue(null);
    this.formularioRegistro.controls['activo_notebook'].setValue(null);
    this.formularioRegistro.controls['linea_telefonica'].setValue(null);
  }else{
    this.alertas.alertToken();
      setTimeout(() => {this.router.navigate(['']);},2000)
  }
}

  formularioRegistro = this.formBuilder.group({
    id: [''],
    legajo: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    area: ['', [Validators.required]],
    posicion: ['', [Validators.required]],
    fecha_entrega: ['', [Validators.required]],
    activo_celular: [''],
    activo_notebook: [''],
    linea_telefonica: [''],
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

  getUsuario(): void {
    this.servicioUsuario.getUsuario().subscribe(
      (res) => {
        this.listadoUsuario = res;
        console.log(this.listadoUsuario);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLineaTelefonicas(): void {
    this.servicioLineaTelefonica.getLineaTelefonica().subscribe(
      (res) => {
        this.listadoLineaTelefonica = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getActivosTotales(): void {
    this.servicioActivoCelular.getActivoCelular().subscribe(
      (res) => {
        this.listadoActivoCelular = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.servicioActivoNotebook.getActivoNotebook().subscribe(
      (res) => {
        this.listadoActivoNotebook = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarUsuario(): void {
    //Utilizamos la funcion del servicio para validar que el usuario no exista a travez del legajo, la funcion devuelve un resultado, si es igual a 0 quiere decir que no existe un valor con ese legajo y registra con exito, de lo contrario nos sale una alerta que nos detalla que no se puede registrar y nos blanquea el input para volver a ingresar el legajo y continuar con el registro
    this.servicioUsuario
      .validacionUsuario(this.formularioRegistro.value.legajo)
      .subscribe((res) => {
        if (res.length == 0) {
          this.asignarValoresFormulario();
          if (this.formularioRegistro.valid) {
            this.servicioUsuario
              .registrarUsuario(this.formularioRegistro.value)
              .subscribe(
                (res) => {
                  console.log(res);
                  this.cerrarModal();
                  this.getUsuario();
                  this.alertas.alertsuccess();
                },
                (error) => {
                  console.log(error);
                  this.alertas.alerterror();
                }
              );
          } else {
            this.alertas.alertcampos();
          }
        } else {
          //Si el legajo ya existe en bd no permite crear registro, y le pasamos el valor null al input
          // de legajo para que lo blanque y obligue al usuario a poner otro y poder registrar con exito
          this.alertas.alertActivoExistente();
          this.formularioRegistro.controls['legajo'].reset();
        }
      });
  }

  UsuarioId(usuario: Usuario, content: any): void {
    this.formularioRegistro.controls['legajo'].disable();
    this.asignarValoresFormulario();
    this.btnEditar = false;
    this.btnGuardar = true;
    this.modalService.open(content, { size: 'lg' });
    this.servicioUsuario.getUsuarioId(usuario).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          legajo: res[0].legajo,
          nombre: res[0].nombre,
          correo: res[0].correo,
          area: res[0].area,
          posicion: res[0].posicion,
          fecha_entrega: res[0].fecha_entrega,
          activo_celular: res[0].activo_celular,
          activo_notebook: res[0].activo_notebook,
          linea_telefonica: res[0].linea_telefonica,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarUsuarioId(): void {
    this.formularioRegistro.controls['legajo'].enable();
    this.asignarValoresFormulario();
    this.servicioUsuario
      .editarUsuario(
        this.formularioRegistro.value,
        this.formularioRegistro.value.id
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getUsuario();
          this.cerrarModal();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }

  // Eliminar alumno enviado por id
  eliminarUsuario(usuario: Usuario): void {
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
        this.servicioUsuario.eliminarUsuario(usuario.id).subscribe((res) => {
          this.getUsuario();
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
  busquedaUsuario(): void {
    if (this.buscar_usuario == '') {
      this.alertas.alertcampos();
    } else {
      this.servicioUsuario.busquedaUsuario(this.buscar_usuario).subscribe(
        (res) => {
          console.log(res);
          if (res.length != 0) {
            this.alertas.alertLoading();
          } else {
            this.alertas.alertLoadingError();
            //Si no encuentra datos se limpia el input y despues del msj de sin coincidencia en busqueda trar todos los usuarios nuevamente, evitando tener que apretar cancelar para volver a listar
            this.buscar_usuario="";
            //Funcion para setear funcion despues de cierto intervalo
            setTimeout(() => {this.getUsuario()},1800)
          }
          this.listadoUsuario = res;
        },
        (error) => {
          this.alertas.alerterror();
        }
      );
    }
  }


  // Funcion para cancelar busqueda por alumno
  cancelarbusquedaUsuario(): void {
    this.getUsuario();
    this.buscar_usuario = '';
  }

  asignarValoresFormulario(): void {
    if (this.formularioRegistro.value.activo_celular != null) {
      this.formularioRegistro.controls['activo_celular'].setValue(
        this.formularioRegistro.value.activo_celular[0]['id']
      );
    }

    if (this.formularioRegistro.value.activo_notebook != null) {
      this.formularioRegistro.controls['activo_notebook'].setValue(
        this.formularioRegistro.value.activo_notebook[0]['id']
      );
    }

    if (this.formularioRegistro.value.linea_telefonica != null) {
      this.formularioRegistro.controls['linea_telefonica'].setValue(
        this.formularioRegistro.value.linea_telefonica[0]['id']
      );
    }
  }
}
