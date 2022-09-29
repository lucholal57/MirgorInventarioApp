import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { FormBuilder, Validators } from '@angular/forms';
import { Produccion } from '../../entidades/produccion/produccion';
import { ProduccionService } from '../../services/produccion/produccion.service';
import { AlertService } from '../../services/alert/alert.service';


@Component({
  selector: 'app-reparacion',
  templateUrl: './reparacion.component.html',
  styleUrls: ['./reparacion.component.css']
})
export class ReparacionComponent implements OnInit {
  //Variable para la fecha y hora
  fechaActual = Date.now();
  hora: any;
  p: number = 1;
  //Variables para los registros Fallas, Acciones, Semaforos
  a = 0;
  b = 0;
  c = 0;
  d = 0;
  e = 0;
  f = 0;
  //Array fallas
  listadoFalla : Produccion[] = [];
  listadoFallaPorSeis: Produccion[] = [];
  array1= [];
  constructor(
    private servicioProduccion : ProduccionService,
    private formBuilder: FormBuilder,
    private alertas: AlertService,
  ) { }

   //Formulario registro
  formularioRegistro = this.formBuilder.group({
    id: [''],
    imei: ['', [Validators.required]],
    falla: ['', [Validators.required]],
    subfalla: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.mostrarHora();
    this.mostrarEstadisca();
    this.actualizarEstadistica();
    this.getFalla();
  }

  //Funcion mostrar hora
  mostrarHora() {
    this.hora = new Date();
    //Intervalo para que despues de 1000mls se actualize la hora dandonos asi los segundos por pantalla.
    setInterval(() => {

      this.hora = new Date();

    }, 1000)
  }

  //Funcion para mostrar graficos estadisticos
  mostrarEstadisca() {

    //Prueba numeros aleatorios
    this.a = Math.round(Math.random() * 20);
    this.b = Math.round(Math.random() * 15);
    this.c = Math.round(Math.random() * 19);
    this.d = Math.round(Math.random() * 8);
    this.e = Math.round(Math.random() * 22);
    this.f = Math.round(Math.random() * 19);

    const myChart = new Chart('myChart', {
      responsive: true,
      type: 'bar',
      data: {
        labels: ['Faltantes', 'Pantalla', 'Tornillos', 'Asistencias'],
        datasets: [{
          label: 'TM',
          //Se deja al final el valor 0 y un maximo para que las barrar tengan donde empezar y terminar
          data: [this.a, this.b, this.c, this.d, 0, this.e],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          Color: '#FFFFFF ',
          borderWidth: 1,
        },
        {
          label: 'TT',
          //Se deja al final el valor 0 y un maximo para que las barrar tengan donde empezar y terminar
          data: [this.e, this.b, this.a, this.f, 0, this.d],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }],

      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });

    const myChart2 = new Chart('myChart2', {
      responsive: true,
      type: 'bar',
      data: {
        labels: ['PPM'],
        datasets: [{
          label: 'TM $USD',
          //Se deja al final el valor 0 y un maximo para que las barrar tengan donde empezar y terminar
          data: [this.a, 0, this.b],
          backgroundColor: [
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1
        },
        {
          label: 'TT $USD',
          //Se deja al final el valor 0 y un maximo para que las barrar tengan donde empezar y terminar
          data: [this.f, 0, this.e],
          backgroundColor: [
            'rgb(255, 99, 132)',
          ],
          borderWidth: 1
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });

    const data = {
      labels: [
        'Pantalla',
        'Faltantes',
        'Tornillos',
        'Asistencias'
      ],
      datasets: [{
        label: 'TM',
        data: [this.a, this.f, this.b, this.b],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(4, 88, 25)',
        ],
        hoverOffset: 10
      }, {
        label: 'TT',
        data: [this.f, this.e, this.c, this.a],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(4, 88, 25)',
        ],
        hoverOffset: 10
      }
      ]
    };


    const myChart3 = new Chart('myChart3', {
      responsive: true,
      type: 'doughnut',
      data: data,
    })



    const data2 = {
      labels: [
        'Pantalla',
        'Faltantes',
        'Tornillos',
        'Asistencias'
      ],
      datasets: [{
        label: 'TM',
        data: [this.c, this.d, this.a, this.f],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      },
      {
        label: 'TT',
        data: [this.a, this.f, this.e, this.c],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }]
    };

    const myChart4 = new Chart('myChart4', {
      responsive: true,
      type: 'line',
      data: data2,
    })
    
  }

  //Se crea funcion para actualizar graficos cada 10 min, al actualizar en muy poco tiempo se traba hay que buscar la vuelta
  actualizarEstadistica(){
    setInterval(() => {
      this.mostrarEstadisca();
    }, 10000)
  }

  focusImei(): void {
    document.getElementById('entradaImei').focus();
  }

  //Funcion para obtener fallas
  getFalla(): void {
    //Se crear un array para poder ingresar la lista de las fallas en el y cambiarla de posicion con el reverse
    this.array1 = [];
    this.servicioProduccion.getFalla().subscribe(
      (res) => {
        this.listadoFalla = res;
        //Reverse, cambia el orden del array de atras hacia adelante
        this.array1 = this.listadoFalla.reverse();
      }
    )
    
  }

  //Funcion registro Fallas
  registrarFalla(): void {
    console.log(this.formularioRegistro.value)
    this.servicioProduccion.registrarFalla(this.formularioRegistro.value).subscribe(
      (res) => {
        console.log("Registro Exitoso" , this.formularioRegistro.value);
        this.formularioRegistro.reset();
        this.alertas.alertOk();
        this.ngOnInit();
      },
      (error) => {
        alert("Error al Cargar Falla");
      }
    )
  }

}