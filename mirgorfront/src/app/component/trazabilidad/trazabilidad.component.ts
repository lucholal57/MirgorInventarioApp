import { Component, OnInit, Input } from '@angular/core';
import { AlertService} from '../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TrazabilidadService } from 'src/app/services/trazabilidad/trazabilidad.service';
import { Trazabilidad } from '../../entidades/trazabilidad/trazabilidad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.css']
})
export class TrazabilidadComponent implements OnInit {
  //Variable para el paginado
   p:number = 1;
  //Array de trazabilidad
  listadoTrazabilidad: Trazabilidad[] =[];
  //Filtro para ver tablas por separado
  TablaNoProductiva_Filtro:boolean = true;
  TablaProductiva_Filtro:boolean = true;

  constructor(
    private servicioTrazabilidad : TrazabilidadService,
    private alertas: AlertService,
    private router:Router
  ) { }

  ngOnInit(): void {
  if(localStorage.length!=0){
    this.getTrazabilidad();
      }else{
        this.alertas.alertToken();
        setTimeout(() => {this.router.navigate(['']);},2000)
      }
 }

getTrazabilidad(): void{
  this.servicioTrazabilidad.getTrazabilidad().subscribe(
    (res) => {
      this.listadoTrazabilidad = res;
    }
  )
  console.log(this.listadoTrazabilidad)
}

}
