import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trazabilidad } from '../../entidades/trazabilidad/trazabilidad';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class TrazabilidadService {
  private url = 'http://127.0.0.1:8000/'
  private url_prod = 'http://192.168.52.60/'

  constructor(private http: HttpClient){}

  getTrazabilidad(): Observable<Trazabilidad[]> {
    return this.http.get<Trazabilidad[]>(this.url_prod + 'trazabilidad',httpOption)
  }
  registrarTrazabilidad(formularioregistro: any): Observable<Trazabilidad[]> {
    return this.http.post<Trazabilidad[]>(this.url_prod + 'trazabilidad', formularioregistro, httpOption)
  }
  getTrazabilidadId(busqueda_trazabilidad: Trazabilidad): Observable<Trazabilidad[]> {
    return this.http.get<Trazabilidad[]>(this.url_prod + 'trazabilidad/'+ busqueda_trazabilidad.id,httpOption)
  }
  editarTrazabilidad(formularioregistro: any, id:number):Observable<Trazabilidad[]> {
    return this.http.put<Trazabilidad[]>(this.url_prod + 'trazabilidad/' + id, formularioregistro, httpOption)
  }
  eliminarTrazabildad(id:number): Observable<Trazabilidad[]> {
    return this.http.delete<Trazabilidad[]>(this.url_prod + 'trazabilidad/' + id, httpOption)
  }
}
