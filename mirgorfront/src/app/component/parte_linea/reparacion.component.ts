import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-reparacion',
  templateUrl: './reparacion.component.html',
  styleUrls: ['./reparacion.component.css']
})
export class ReparacionComponent implements OnInit {
fechaActual= Date.now();
hora:any;

  constructor() { }

  ngOnInit(): void {

    this.mostrarHora();
    this.mostrarEstadisca();
}

mostrarHora(){
  this.hora = new Date();
  setInterval(()=>{

    this.hora = new Date();

  },1000)
}

mostrarEstadisca(){
  const myChart = new Chart('myChart', {
    responsive: true,
    type: 'bar',
    data: {
        labels: ['Faltantes', 'Pantalla', 'Tornillos', 'Asistencias'],
        datasets: [{
            label: 'TM',
            //Se deja al final el valor 0 y un maximo para que las barrar tengan donde empezar y terminar
            data: [6, 3, 12, 7,0,15],
            backgroundColor:'rgba(75, 192, 192, 0.2)',
            borderColor:'rgba(75, 192, 192, 1)',
            Color:'#FFFFFF ',
            borderWidth: 1,
        },
        {
          label: 'TT',
          //Se deja al final el valor 0 y un maximo para que las barrar tengan donde empezar y terminar
          data: [12, 5, 8, 3,0,15],
          backgroundColor:  'rgba(54, 162, 235, 0.2)',
          borderColor:'rgba(54, 162, 235, 1)',
          borderWidth: 1
      }],
        
    },
    options: {
        scales: {
            y: {
                beginAtZero:true,
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
            data: [1700,0,9000],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            borderWidth: 1
        },
        {
          label: 'TT $USD',
          //Se deja al final el valor 0 y un maximo para que las barrar tengan donde empezar y terminar
          data: [3200,0,9000],
          backgroundColor: [
            'rgb(255, 99, 132)',
          ],
          borderWidth: 1
      }],
    },
    options: {
        scales: {
            y: {
                beginAtZero:true,
            }
        }
    }
  });

  setInterval(()=>{

   this.mostrarEstadisca();

  },300000)
}



}