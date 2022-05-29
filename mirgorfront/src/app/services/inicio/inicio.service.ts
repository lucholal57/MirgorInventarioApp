import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';
  private url_prod = 'http://192.168.52.230:8080/'

  constructor(private http: HttpClient) { }

  logout(user:any): Observable<any> {
    return this.http.post(this.url + 'logout/' , user)
  }
}
