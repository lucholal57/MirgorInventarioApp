import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { ActivoComponent } from './component/activos/activo_industrial/activo.component';
import { LocacionComponent } from './component/locacion/locacion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstadisticaComponent } from './component/estadistica/estadistica.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ActivoStandarComponent } from './component/activos/activo-standar/activo-standar.component';
import { ActivoGeneralComponent } from './component/activos/activo-general/activo-general.component';
import { ActivoCelularComponent } from './component/activos/activo-celular/activo-celular.component';
import { ActivoNotebookComponent } from './component/activos/activo-notebook/activo-notebook.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { LineaTelefonicaComponent } from './component/linea-telefonica/linea-telefonica.component';
import { LoginComponent } from './component/login/login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LocacionProductivaComponent } from './component/locacion-productiva/locacion-productiva.component';
import { FiltroLocacionPipe } from './pipes/filtro-locacion.pipe';
import { TrazabilidadComponent } from './component/trazabilidad/trazabilidad.component';
import { AngularMaterialModule} from '../app/angular-material.module';
import { SeguridadComponent } from '../app/component/seguridad/seguridad.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ActivoComponent,
    LocacionComponent,
    EstadisticaComponent,
    ActivoStandarComponent,
    ActivoGeneralComponent,
    ActivoCelularComponent,
    ActivoNotebookComponent,
    UsuarioComponent,
    LineaTelefonicaComponent,
    LoginComponent,
    LocacionProductivaComponent,
    FiltroLocacionPipe,
    TrazabilidadComponent,
    SeguridadComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    TypeaheadModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgxChartsModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    NgSelectModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
