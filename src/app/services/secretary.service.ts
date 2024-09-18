import { HttpClient } from '@angular/common/http';
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
    return this.http.get<{ data: Secretary[] }>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(
        map(response => response.data) // Extrae el array de la propiedad `data`
      );
  }
   deleteSecretary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);}

   addSecretary(secretary: Secretary): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, secretary)}

   getSecretary(id: number): Observable<Secretary> {
    return this.http.get<{ data: Secretary }>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
      .pipe(
        map(response => response.data) // Extrae el objeto de la propiedad `data`
      );}

   updateSecretary(id: number, secretary: Secretary): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, secretary) }
}
