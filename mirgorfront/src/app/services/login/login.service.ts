import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
   // Variable para la url
   private url = 'http://127.0.0.1:8000/';
   private url_prod = 'http://192.168.52.230:8080/'

  constructor(
    private http: HttpClient,
  ) { }

  login(user:any): Observable<any> {
    return this.http.post(this.url_prod + 'login/' , user)
  }

}
