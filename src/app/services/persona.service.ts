import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private myApiUrl: String;
  private myAppUrl: String;

  constructor( private http: HttpClient) {
    this.myApiUrl = "api/Secretaries";
    this.myAppUrl = "http://localhost:3000/";
   }

   getPersonas(): Observable<Persona[]> {
    return this.http.get<{ data: Persona[] }>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(
        map(response => response.data) // Extrae el array de la propiedad `data`
      );
  }
   deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);}
  
}
