import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secretary } from '../interfaces/secretary';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {
  private myApiUrl: String;
  private myAppUrl: String;

  constructor( private http: HttpClient) {
    this.myApiUrl = "api/Secretaries";
    this.myAppUrl = "http://localhost:3000/";
   }

   getSecretarys(): Observable<Secretary[]> {
    // Recuperar el token del localStorage
      const token = localStorage.getItem('token');
    
      // Configurar las cabeceras con el token
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return this.http.get<{ data: Secretary[] }>(`${this.myAppUrl}${this.myApiUrl}`, { headers })
      .pipe(
        map(response => response.data) // Extrae el array de la propiedad `data`
      );
  }
   deleteSecretary(id: number): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, {headers});}

  addSecretary(secretary: Secretary): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');
    
    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, secretary, { headers });}

   getSecretary(id: number): Observable<Secretary> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');
    
    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<{ data: Secretary }>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers })
      .pipe(
        map(response => response.data) // Extrae el objeto de la propiedad `data`
      );}

   updateSecretary(id: number, secretary: Secretary): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');
    
    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, secretary,{headers}) }
}
