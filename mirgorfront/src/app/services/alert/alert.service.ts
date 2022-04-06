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
    Swal.fire('"El Activo Existe en Base de Datos')
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

  alerteLogin(){
    Swal.fire(
      'Es un usuario valido?',
      'Verifique Usuario y Contraseña',
      'question'
    )
  }
  alertDescuentoCajaChicaOk(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se registra compra y descuenta Saldo de CAJA CHICA',
      showConfirmButton: false,
      timer: 3000
    })
  }
  alertDescuentoCajaChicaError(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'El monto supera Saldo de Caja Chica',
      showConfirmButton: false,
      timer: 3000
    })
  }
  alertDescuentoCajaChicaDevolucion(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se devulve Saldo',
      showConfirmButton: false,
      timer: 3000
    })
  }
  alertStock(){
    Swal.fire('El stock es insuficiente')
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
