import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activo } from 'src/app/entidades/activos/activo_industrial/activo';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}
@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  private url = 'http://127.0.0.1:8000/'
  private url_prod = 'http://192.168.52.230:8080/'

  constructor( private http : HttpClient) { }

  getActivos(): Observable<Activo[]>{
    return this.http.get<Activo[]>(this.url_prod + 'activo' , httpOption)
  }
  getActivosPorPuestoLinea(fabricante:string): Observable<Activo[]>{
    return this.http.get<Activo[]>(this.url_prod + 'activo/buscar/fabricante/' + fabricante  , httpOption)
  }
  registrarActivo(formularioregistro:any):Observable<Activo[]>{
    return this.http.post<Activo[]>(this.url_prod + 'activo', formularioregistro, httpOption)
  }
  getActivoId(busqueda_activo: Activo): Observable<Activo[]>{
    return this.http.get<Activo[]>(this.url_prod + 'activo/' + busqueda_activo.id,httpOption );
  }

  editarActivo(formularioregistro: any, id: number): Observable<Activo[]>{
    return this.http.put<Activo[]>(this.url_prod + 'activo/' + id, formularioregistro, httpOption);

  }
  eliminarActivo(id: number): Observable<Activo[]>{
    return this.http.delete<Activo[]>(this.url_prod + 'activo/' + id, httpOption );
  }
  busquedaActivo(buscar_activo:string): Observable<Activo[]>{
    return  this.http.get<Activo[]>(this.url_prod + 'activo/buscar/' + buscar_activo, httpOption );
  }
  validacionInventario(validar_inventario:string): Observable<Activo[]>{
    return this.http.get<Activo[]>(this.url_prod + 'activo/validar/' + validar_inventario, httpOption );
  }
}
