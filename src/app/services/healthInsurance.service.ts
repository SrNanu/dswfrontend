import { HttpClient } from '@angular/common/http';
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
  return this.http.get<{ data: HealthInsurance[] }>(`${this.myAppUrl}${this.myApiUrl}`)
    .pipe(
      map(response => response.data)
    );
}

deleteHealthInsurance(id: number): Observable<void> {
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
}

addHealthInsurance(aHealthInsurance: HealthInsurance): Observable<void> {
  return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, aHealthInsurance);
}

getHealthInsurance(id:number): Observable<HealthInsurance> {
  return this.http.get<HealthInsurance>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
}

updateHealthInsurance(id: number, aHealthInsurance: HealthInsurance): Observable<void> {
  return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, aHealthInsurance);
}


}
