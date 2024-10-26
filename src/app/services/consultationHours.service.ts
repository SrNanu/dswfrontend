import { HttpClient } from '@angular/common/http';
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
    this.myApiUrl = 'api/ConsultationHours'
  }

getAllConsultationHours(): Observable<ConsultationHours[]> {
  return this.http.get<{ data: ConsultationHours[] }>(`${this.myAppUrl}${this.myApiUrl}`)
    .pipe(
      map(response => response.data)
    );
}

deleteConsultationHours(id: number): Observable<void> {
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
}

addConsultationHours(aConsultationHours: ConsultationHours): Observable<void> {
  return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, aConsultationHours);
}

getConsultationHours(id:number): Observable<ConsultationHours> {
  return this.http.get<{ data: ConsultationHours }>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  .pipe(
    map(response => response.data) // Extrae el objeto de la propiedad `data`
  );
}

updateConsultationHours(id: number, aConsultationHours: ConsultationHours): Observable<void> {
  return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, aConsultationHours);
}


}
