import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  resultado: any;
  constructor() {}

  // Alert de OK
  alertsuccess() {
    Swal.fire('Excelente', 'Se registro correctamente', 'success');
  }
  // Alert asistencia
  alertActivoExistente() {
    Swal.fire('El Registro ya Existe en Base de Datos')
  }

  // Alerta Edicion OK
  alertedit() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Edicion Exitosa!!',
      showConfirmButton: false,
      timer: 1700,
    });
  }

  //Alerta encontro resultados
  alertSeguridadOk() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'EXITO',
      showConfirmButton: false,
      timer: 550,
    });
  }

    //Alerta encontro resultados
    alertSeguridadNoOk() {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'SIN DATOS!!',
        showConfirmButton: false,
        timer: 550,
      });
    }


  // Alert error
  alerterror() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Falla de Conexion!',
    });
  }
  // Alert campos requeridos
  alertcampos() {
    Swal.fire('Existen campos obligatorios sin rellenar');
  }

  alertLoading(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Busqueda Exitosa',
      showConfirmButton: false,
      timer: 1800
    })
  }

  alertLoadingError(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'No se encontraron coincidencias',
      showConfirmButton: false,
      timer: 1800
    })
  }

  alertLogin(){
    Swal.fire(
      'Es un usuario valido???',
      'Verifique Usuario y Contraseña',
      'question'
    )
  }
  alertToken(){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'No inicio Sesion, Redirigiendo',
      showConfirmButton: false,
      timer: 2000
    })
  }

  alertOk(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }


  /* Alert eliminar el

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
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }

    });
  */
}
