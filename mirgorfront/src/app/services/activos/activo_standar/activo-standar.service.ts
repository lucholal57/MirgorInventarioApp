import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivoStandar } from '../../../entidades/activos/activo_standar/activo-standar';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              }),
}

@Injectable({
  providedIn: 'root'
})
export class ActivoStandarService {
  private url = 'http://127.0.0.1:8000/'
  private url_prod = 'http://192.168.52.230:8080/'

  constructor( private http: HttpClient) { }

  getActivoStandar(): Observable<ActivoStandar[]>{
    return this.http.get<ActivoStandar[]>(this.url_prod + 'activo_standar' , httpOption)
  }
  registrarActivoStandar(formularioregistro:any):Observable<ActivoStandar[]>{
    return this.http.post<ActivoStandar[]>(this.url_prod + 'activo_standar', formularioregistro, httpOption)
  }
  getActivoStandarId(busqueda_activo: ActivoStandar): Observable<ActivoStandar[]>{
    return this.http.get<ActivoStandar[]>(this.url_prod + 'activo_standar/' + busqueda_activo.id,httpOption );
  }

  editarActivoStandar(formularioregistro: any, id: number): Observable<ActivoStandar[]>{
    return this.http.put<ActivoStandar[]>(this.url_prod + 'activo_standar/' + id, formularioregistro, httpOption);

  }
  eliminarActivoStandar(id: number): Observable<ActivoStandar[]>{
    return this.http.delete<ActivoStandar[]>(this.url_prod + 'activo_standar/' + id, httpOption );
  }
  busquedaActivo(buscar_activo:string): Observable<ActivoStandar[]>{
    return  this.http.get<ActivoStandar[]>(this.url_prod + 'activo_standar/buscar/' + buscar_activo, httpOption );
  }
  validacionInventario(validar_inventario:string): Observable<ActivoStandar[]>{
    return this.http.get<ActivoStandar[]>(this.url_prod + 'activo_standar/validar/' + validar_inventario, httpOption );
  }
}
