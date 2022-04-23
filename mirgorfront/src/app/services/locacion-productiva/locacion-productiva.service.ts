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
  private url_prod = 'http://192.168.52.230:8080/'

  constructor(private http: HttpClient) { }

  getLocacionesProductivas(): Observable<LocacionProductiva[]>{
    return this.http.get<LocacionProductiva[]>(this.url_prod + 'locacion_productiva' , httpOption)
  }
  registrarLocacionProductiva(formularioregistro:any):Observable<LocacionProductiva[]>{
    return this.http.post<LocacionProductiva[]>(this.url_prod + 'locacion_productiva', formularioregistro, httpOption)
  }
  getLocacionProductivaId(busqueda_Locacion_productiva: LocacionProductiva): Observable<LocacionProductiva[]>{
    return this.http.get<LocacionProductiva[]>(this.url_prod + 'locacion_productiva/' + busqueda_Locacion_productiva.id,httpOption );
  }

  editarLocacionProductiva(formularioregistro: any, id: number): Observable<LocacionProductiva[]>{
    return this.http.put<LocacionProductiva[]>(this.url_prod + 'locacion_productiva/' + id, formularioregistro, httpOption);

  }
  eliminarLocacionProductiva(id: number): Observable<LocacionProductiva[]>{
    return this.http.delete<LocacionProductiva[]>(this.url_prod + 'locacion_productiva/' + id, httpOption );
  }
  busquedaLocacionProductiva(buscar_locacion_productiva:any): Observable<LocacionProductiva[]>{
    return  this.http.get<LocacionProductiva[]>(this.url_prod + 'locacion/buscar/' + buscar_locacion_productiva, httpOption );
  }
}
