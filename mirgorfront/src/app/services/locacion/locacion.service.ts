import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locacion } from 'src/app/entidades/locacion/locacion';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class LocacionService {
  private url = 'http://127.0.0.1:8000/'
  private url_prod = 'http://192.168.52.230:8080/'

  constructor( private http : HttpClient) { }

  getLocaciones(): Observable<Locacion[]>{
    return this.http.get<Locacion[]>(this.url_prod + 'locacion' , httpOption)
  }
  registrarLocacion(formularioregistro:any):Observable<Locacion[]>{
    return this.http.post<Locacion[]>(this.url_prod + 'locacion', formularioregistro, httpOption)
  }
  getLocacionId(busqueda_Locacion: Locacion): Observable<Locacion[]>{
    return this.http.get<Locacion[]>(this.url_prod + 'locacion/' + busqueda_Locacion.id,httpOption );
  }

  editarLocacion(formularioregistro: any, id: number): Observable<Locacion[]>{
    return this.http.put<Locacion[]>(this.url_prod + 'locacion/' + id, formularioregistro, httpOption);

  }
  eliminarLocacion(id: number): Observable<Locacion[]>{
    return this.http.delete<Locacion[]>(this.url_prod + 'locacion/' + id, httpOption );
  }
  busquedaLocacion(buscar_locacion:any): Observable<Locacion[]>{
    return  this.http.get<Locacion[]>(this.url_prod + 'locacion/buscar/' + buscar_locacion, httpOption );
  }
}
