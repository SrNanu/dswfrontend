import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HealthInsurance } from '../interfaces/healthInsurance.js';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class HealthInsuranceService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myApiUrl = "api/HealthInsurances";
    this.myAppUrl = "http://localhost:3000/";
    
  }

getHealthInsurances(): Observable<HealthInsurance[]> {
  // Recuperar el token del localStorage
    const token = localStorage.getItem('token');
  
    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  return this.http.get<{ data: HealthInsurance[] }>(`${this.myAppUrl}${this.myApiUrl}`, { headers })
    .pipe(
      map(response => response.data)
    );
}

deleteHealthInsurance(id: number): Observable<void> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');

  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers });
}

addHealthInsurance(aHealthInsurance: HealthInsurance): Observable<void> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');

  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, aHealthInsurance, { headers });
}

getHealthInsurance(id:number): Observable<HealthInsurance> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');

  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.get<HealthInsurance>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers });
}

updateHealthInsurance(id: number, aHealthInsurance: HealthInsurance): Observable<void> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');

  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, aHealthInsurance, { headers });
}


}
