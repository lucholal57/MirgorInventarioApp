import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {
  listadoUsuario: Usuario[]=[];
  item:boolean=false;
  placeholder="";


  constructor(
    private servicioUsuario: UsuarioService,
    private formBuilder: FormBuilder,
    private alertas: AlertService
  ) { }

  ngOnInit(): void {
    this.placeholder="INGRESE IMEI..."
  }

  //formularioBusqueda
  formularioBusqueda = this.formBuilder.group({
    busqueda:['', [Validators.required]],
  })

  obtenerPlaceholder(): void {
    if(this.item==false){
      this.placeholder="INGRESE IMEI..."
    }else{
      this.placeholder="INGRESE LEGAJO..."
    }
  }

  getUsuarioImei():void{
    if(this.item==false){
    this.servicioUsuario.ValidacionImeiUsuario(this.formularioBusqueda.value.busqueda).subscribe(
      (res)  => {
        console.log("valores encontrados",res)
        this.listadoUsuario=res;
        if(this.listadoUsuario.length==0){
          this.alertas.alertSeguridadNoOk();
        }else{this.alertas.alertSeguridadOk();}
      }
    )
  }else{
    this.servicioUsuario.validacionUsuario(this.formularioBusqueda.value.busqueda).subscribe(
      (res) => {
        this.listadoUsuario=res;
        if(this.listadoUsuario.length==0){
          this.alertas.alertSeguridadNoOk();
        }else{this.alertas.alertSeguridadOk();}
      }
    )
  }
  this.formularioBusqueda.controls['busqueda'].reset();
}


  Limpiar(): void {
    this.formularioBusqueda.reset();
  }

}
