import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ActivoCelular} from 'src/app/entidades/activos/activo_celular/activo-celular';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              }),
}


@Injectable({
  providedIn: 'root'
})
export class ActivoCelularService {
  private url = 'http://127.0.0.1:8000/'
  private url_prod = 'http://192.168.52.60/'

  constructor( private http : HttpClient) { }

  getActivoCelular(): Observable<ActivoCelular[]>{
    return this.http.get<ActivoCelular[]>(this.url + 'celular' , httpOption)
  }
  registrarActivoCelular(formularioregistro:any):Observable<ActivoCelular[]>{
    return this.http.post<ActivoCelular[]>(this.url + 'celular', formularioregistro, httpOption)
  }
  getActivoCelularId(busqueda_activo: ActivoCelular): Observable<ActivoCelular[]>{
    return this.http.get<ActivoCelular[]>(this.url + 'celular/' + busqueda_activo.id,httpOption );
  }

  editarActivoCelular(formularioregistro: any, id: number): Observable<ActivoCelular[]>{
    return this.http.put<ActivoCelular[]>(this.url + 'celular/' + id, formularioregistro, httpOption);

  }
  eliminarActivoCelular(id: number): Observable<ActivoCelular[]>{
    return this.http.delete<ActivoCelular[]>(this.url + 'celular/' + id, httpOption );
  }
  busquedaActivo(buscar_activo:string): Observable<ActivoCelular[]>{
    return  this.http.get<ActivoCelular[]>(this.url + 'celular/buscar/' + buscar_activo, httpOption );
  }

}

