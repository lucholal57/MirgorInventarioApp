import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Activo } from '../../entidades/activos/activo_industrial/activo';
import { ActivoService } from 'src/app/services/activos/activo_industrial/activo.service';
import { ActivoCelular } from 'src/app/entidades/activos/activo_celular/activo-celular';
import { ActivoCelularService } from 'src/app/services/activos/activo_celular/activo-celular.service';
import { ActivoNotebook } from 'src/app/entidades/activos/activo_notebook/activo-notebook';
import { ActivoNotebookService } from 'src/app/services/activos/activo_notebook/activo-notebook.service';
import { ActivoGeneral } from 'src/app/entidades/activos/activo_general/activo-general';
import { ActivoGeneralService } from 'src/app/services/activos/activo_general/activo-general.service';
import { ActivoStandar } from 'src/app/entidades/activos/activo_standar/activo-standar';
import { ActivoStandarService } from 'src/app/services/activos/activo_standar/activo-standar.service';
import { LineaTelefonica } from 'src/app/entidades/linea_telefonica/linea-telefonica';
import { LineaTelefonicaService } from 'src/app/services/linea_telefonica/linea-telefonica.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {
  //Arrays para la obtencion de los activos
  listadoActivoIndustrial : Activo[] =[];
  listadoActivoGeneral : ActivoGeneral[]=[];
  listadoActivoStandar : ActivoStandar[] =[];
  listadoActivoCelular : ActivoCelular[]=[];
  listadoActivoNotebook : ActivoNotebook[]=[];
  listadoLineaTelefonica : LineaTelefonica[] =[];
  activos=[];
  constructor(
    private servicioActivoCelular: ActivoCelularService,
    private servicioActivoNotebook: ActivoNotebookService,
    private servicioActivoGeneral: ActivoGeneralService,
    private servicioActivo : ActivoService,
    private servicioActivoStandar : ActivoStandarService,
    private servicioLineaTelefonica: LineaTelefonicaService,
    private alertas : AlertService,
    private router:Router
  ) { }

  ngOnInit(): void {
  if(localStorage.length!=0){
    this.getActivosTotales();
    }else{
      this.alertas.alertToken();
      setTimeout(() => {this.router.navigate(['']);},2000)
    }
  }

  single: [];
  multi: [];

  vertical: [number,number] = [700, 400];
  pie_advance: [number,number] = [900, 300];
  view: [number,number] = [950, 300];
  horizontal: [number,number] = [700, 300];

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
  responsive='true';
 

  colorScheme = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#01C965', '#01B7C9', '#C9AB01 ', '#65C901', '#AE01C9 '],

  };

  getActivosTotales() : void{
    this.servicioActivo.getActivos().subscribe(
      (res) => {
        this.listadoActivoIndustrial  = res;
        this.activos.push(new Object({name:'ACTIVO INDUSTRIAL' , value: this.listadoActivoIndustrial.length}));
        this.activos=[...this.activos]
        console.log(this.activos)
      }
    )
    this.servicioActivoCelular.getActivoCelular().subscribe(
      (res) => {
        this.listadoActivoCelular  = res;
        this.activos.push(new Object({name:'ACTIVO CELULAR' , value: this.listadoActivoCelular.length}));
        this.activos=[...this.activos]
        console.log(this.activos)
      }
    )
    this.servicioActivoNotebook.getActivoNotebook().subscribe(
      (res) => {
        this.listadoActivoNotebook = res;
        this.activos.push(new Object({name:'ACTIVO NOTEBOOK' , value: this.listadoActivoNotebook.length}));
        this.activos=[...this.activos]
        console.log(this.activos)
      }
    )
    this.servicioActivoGeneral.getActivoGeneral().subscribe(
      (res) => {
        this.listadoActivoGeneral = res;
        this.activos.push(new Object({name:'ACTIVO GENERAL' , value: this.listadoActivoGeneral.length}));
        this.activos=[...this.activos]
        console.log(this.activos)
      }
    )
    this.servicioActivoStandar.getActivoStandar().subscribe(
      (res) => {
        this.listadoActivoStandar = res;
        this.activos.push(new Object({name:'ACTIVO STANDAR' , value: this.listadoActivoStandar.length}));
        this.activos=[...this.activos]
        console.log(this.activos)
      }
    )

  this.servicioLineaTelefonica.getLineaTelefonica().subscribe(
    (res) => {
      this.listadoLineaTelefonica = res;
      this.activos.push(new Object({name:'LINEA TEL.' , value: this.listadoLineaTelefonica.length}));
      this.activos=[...this.activos]
      console.log(this.activos)
    }
  )
}
 
}
