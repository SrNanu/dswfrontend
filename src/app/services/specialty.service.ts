import { HttpClient } from '@angular/common/http';
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
  return this.http.get<{ data: Specialty[] }>(`${this.myAppUrl}${this.myApiUrl}`)
    .pipe(
      map(response => response.data)
    );
}

deleteSpecialty(id: number): Observable<void> {
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
}

addSpecialty(aSpecialty: Specialty): Observable<void> {
  return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, aSpecialty);
}

getSpecialty(id:number): Observable<Specialty> {
  return this.http.get<Specialty>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
}

updateSpecialty(id: number, aSpecialty: Specialty): Observable<void> {
  return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, aSpecialty);
}


}
