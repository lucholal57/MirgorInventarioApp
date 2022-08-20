import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivoCelularComponent } from './component/activos/activo-celular/activo-celular.component';
import { ActivoGeneralComponent } from './component/activos/activo-general/activo-general.component';
import { ActivoNotebookComponent } from './component/activos/activo-notebook/activo-notebook.component';
import { ActivoStandarComponent } from './component/activos/activo-standar/activo-standar.component';
import { ActivoComponent } from './component/activos/activo_industrial/activo.component';
import { EstadisticaComponent } from './component/estadistica/estadistica.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { LineaTelefonicaComponent } from './component/linea-telefonica/linea-telefonica.component';
import { LocacionProductivaComponent } from './component/locacion-productiva/locacion-productiva.component';
import { LocacionComponent } from './component/locacion/locacion.component';
import { LoginComponent } from './component/login/login.component';
import { ReparacionComponent } from './component/parte_linea/reparacion.component';
import { SeguridadComponent } from './component/seguridad/seguridad.component';
import { TrazabilidadComponent } from './component/trazabilidad/trazabilidad.component'
import { UsuarioComponent } from './component/usuario/usuario.component';

const routes: Routes = [
  {path:'inicio', component: InicioComponent},
  {path:'activo_industrial', component: ActivoComponent},
  {path:'activo_celular', component: ActivoCelularComponent},
  {path:'activo_notebook', component: ActivoNotebookComponent},
  {path:'activo_standar', component: ActivoStandarComponent},
  {path:'activo_general', component: ActivoGeneralComponent},
  {path:'locacion', component: LocacionComponent},
  {path:'dashboard', component: EstadisticaComponent},
  {path:'usuario', component: UsuarioComponent},
  {path:'linea_telefonica', component:LineaTelefonicaComponent},
  {path:'', component: LoginComponent},
  {path:'locacion_productiva', component: LocacionProductivaComponent},
  {path:'trazabilidad', component: TrazabilidadComponent},
  {path:'seguridad', component: SeguridadComponent},
  {path:'reparacion',component: ReparacionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
