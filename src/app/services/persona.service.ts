import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs/internal/Observable';

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
      return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }
}
