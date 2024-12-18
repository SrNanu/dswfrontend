import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Specialty } from '../interfaces/specialty.js';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/Specialties'
  }

getSpecialties(): Observable<Specialty[]> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');
      
  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`,
  });
  return this.http.get<{ data: Specialty[] }>(`${this.myAppUrl}${this.myApiUrl}`, { headers })
    .pipe(
      map(response => response.data)
    );
}

deleteSpecialty(id: number): Observable<void> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');
      
  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`,
  });
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers });
}

addSpecialty(aSpecialty: Specialty): Observable<void> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');
      
  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`,
  });
  return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, aSpecialty, { headers });
}

getSpecialty(id:number): Observable<Specialty> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');
      
  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`,
  });
  return this.http.get<Specialty>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers })
}

updateSpecialty(id: number, aSpecialty: Specialty): Observable<void> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');
      
  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`,
  });
  return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, aSpecialty, { headers });
}

}
