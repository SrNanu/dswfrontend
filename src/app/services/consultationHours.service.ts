import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConsultationHours } from '../interfaces/consultationHours.js';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ConsultationHoursService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/consultationhours'
  }

getAllConsultationHours(): Observable<ConsultationHours[]> {
  // Recuperar el token del localStorage
      const token = localStorage.getItem('token');
  
      // Configurar las cabeceras con el token
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
  return this.http.get<{ data: ConsultationHours[] }>(`${this.myAppUrl}${this.myApiUrl}`, { headers })
    .pipe(
      map(response => response.data)
    );
}

deleteConsultationHours(id: number): Observable<void> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');

  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers });
}

addConsultationHours(aConsultationHours: ConsultationHours): Observable<void> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');

  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, aConsultationHours, { headers });
}

getConsultationHours(id:number): Observable<ConsultationHours> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');

  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.get<{ data: ConsultationHours }>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers })
  .pipe(
    map(response => response.data) // Extrae el objeto de la propiedad `data`
  );
}

updateConsultationHours(id: number, aConsultationHours: ConsultationHours): Observable<void> {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');

  // Configurar las cabeceras con el token
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, aConsultationHours, { headers });
}


}
