import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produccion } from '../../entidades/produccion/produccion';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {
  private url = 'http://127.0.0.1:8000/'

  constructor(private http : HttpClient) { }

  getFalla(): Observable<Produccion[]>{
    return this.http.get<Produccion[]>(this.url + 'falla' , httpOption)
  }

  registrarFalla(formularioregistro:any): Observable<Produccion[]>{
    return this.http.post<Produccion[]>(this.url + 'falla', formularioregistro, httpOption)
  }

}
