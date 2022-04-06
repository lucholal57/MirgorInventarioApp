import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocacionProductiva } from 'src/app/entidades/locacion-productiva/locacion-productiva';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              }),
}

@Injectable({
  providedIn: 'root'
})
export class LocacionProductivaService {
  private url = 'http://127.0.0.1:8000/'
  private url_prod = 'http://192.168.52.60/'

  constructor(private http: HttpClient) { }

  getLocacionesProductiva(): Observable<LocacionProductiva[]>{
    return this.http.get<LocacionProductiva[]>(this.url + 'locacion_productiva' , httpOption)
  }
  registrarLocacion(formularioregistro:any):Observable<LocacionProductiva[]>{
    return this.http.post<LocacionProductiva[]>(this.url + 'locacion_productiva', formularioregistro, httpOption)
  }
  getLocacionId(busqueda_Locacion_productiva: LocacionProductiva): Observable<LocacionProductiva[]>{
    return this.http.get<LocacionProductiva[]>(this.url + 'locacion_productiva/' + busqueda_Locacion_productiva.id,httpOption );
  }

  editarLocacion(formularioregistro: any, id: number): Observable<LocacionProductiva[]>{
    return this.http.put<LocacionProductiva[]>(this.url + 'locacion_productiva/' + id, formularioregistro, httpOption);

  }
  eliminarLocacion(id: number): Observable<LocacionProductiva[]>{
    return this.http.delete<LocacionProductiva[]>(this.url + 'locacion_productiva/' + id, httpOption );
  }
  busquedaLocacion(buscar_locacion:any): Observable<LocacionProductiva[]>{
    return  this.http.get<LocacionProductiva[]>(this.url + 'locacion/buscar/' + buscar_locacion, httpOption );
  }
}
