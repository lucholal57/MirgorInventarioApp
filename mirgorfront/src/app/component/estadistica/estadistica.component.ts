import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  single: [];
  multi: [];

  vertical: [number,number] = [900, 500];
  pie_advance: [number,number] = [900, 400];
  view: [number,number] = [950, 300];
  horizontal: [number,number] = [800, 200];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'EQUIPOS';
  showYAxisLabel = true;
  yAxisLabel = 'CANTIDAD';
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#01C965', '#01B7C9', '#C9AB01 ', '#65C901', '#AE01C9 '],

  };
  data=[
    {
      "name": "IMEICHECK",
      "value": 12,
    },
    {
      "name": "RF",
      "value": 18,
    },
    {
      "name": "BRESSNER",
      "value": 10,
      "extra": {
        "code": "it"
      }
    },
    {
      "name": "TOUCHPANEL",
      "value": 50
    }
  ]

  data2 =[
    {
      "name": "ZEBRA ZT320",
      "value": 24
    },
    {
      "name": "ZEBRA X1014",
      "value": 13
    },
    {
      "name": "ZATO",
      "value": 3
    },
    {
      "name": "ZEBRA X",
      "value": 21
    },
    {
      "name": "ZEBRA XX",
      "value": 51
    },
    {
      "name": "ZEBRA XXX",
      "value": 41
    },
  ]

  data3 =[
    {
      "name": "NOTEBOOK",
      "value": 13
    },
    {
      "name": "CELULARES",
      "value": 35
    },
    {
      "name": "RADIOS",
      "value": 10
    }
  ]

  data4 =[
    {
      "name": "RADIOS",
      "value": 31
    },
    {
      "name": "MODEM",
      "value": 17
    },
    {
      "name": "TELEFONOS IP",
      "value": 12
    },
    {
      "name": "SSD",
      "value": 45
    },

  ]

}
