import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineaTelefonica } from 'src/app/entidades/linea_telefonica/linea-telefonica';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class LineaTelefonicaService {
  private url = 'http://127.0.0.1:8000/'
  private url_prod = 'http://192.168.52.230:8080/'

  constructor(private http: HttpClient) { }

  getLineaTelefonica(): Observable<LineaTelefonica[]>{
    return this.http.get<LineaTelefonica[]>(this.url_prod + 'linea_telefonica' , httpOption)
  }

  registrarLineaTelefonica(formularioregistro:any):Observable<LineaTelefonica[]>{
    return this.http.post<LineaTelefonica[]>(this.url_prod + 'linea_telefonica', formularioregistro, httpOption)
  }
  getLineaTelefonicaId(busqueda_linea_telefonica: LineaTelefonica): Observable<LineaTelefonica[]>{
    return this.http.get<LineaTelefonica[]>(this.url_prod + 'linea_telefonica/' + busqueda_linea_telefonica.id,httpOption );
  }

  editarLineaTelefonica(formularioregistro: any, id: number): Observable<LineaTelefonica[]>{
    return this.http.put<LineaTelefonica[]>(this.url_prod + 'linea_telefonica/' + id, formularioregistro, httpOption);

  }
  eliminarLineaTelefonica(id: number): Observable<LineaTelefonica[]>{
    return this.http.delete<LineaTelefonica[]>(this.url_prod + 'linea_telefonica/' + id, httpOption );
  }
  busquedaLineaTelefonica(buscar_linea_telefonica:string): Observable<LineaTelefonica[]>{
    return  this.http.get<LineaTelefonica[]>(this.url_prod + 'linea_telefonica/buscar/' + buscar_linea_telefonica, httpOption );
  }
  validacionLineaTelefonica(validar_linea_telefonica:string): Observable<LineaTelefonica[]>{
    return  this.http.get<LineaTelefonica[]>(this.url_prod + 'linea_telefonica/validar/' + validar_linea_telefonica, httpOption)
  }

}
