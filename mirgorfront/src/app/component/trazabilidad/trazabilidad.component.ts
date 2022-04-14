import { Component, OnInit, Input } from '@angular/core';
import { AlertService} from '../../services/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TrazabilidadService } from 'src/app/services/trazabilidad/trazabilidad.service';
import { Trazabilidad } from '../../entidades/trazabilidad/trazabilidad';

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
    private servicioTrazabilidad : TrazabilidadService
  ) { }

  ngOnInit(): void {
  this.getTrazabilidad();
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
