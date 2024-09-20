import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private myApiUrl: String;
  private myAppUrl: String;

  constructor( private http: HttpClient) {
    this.myApiUrl = "api/Patients";
    this.myAppUrl = "http://localhost:3000/";
   }

   getPatients(): Observable<Patient[]> {
    return this.http.get<{ data: Patient[] }>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(
        map(response => response.data) // Extrae el array de la propiedad `data`
      );
  }
   deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);}

   addPatient(patient: Patient): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, patient)}

   getPatient(id: number): Observable<Patient> {
    return this.http.get<{ data: Patient }>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
      .pipe(
        map(response => response.data) // Extrae el objeto de la propiedad `data`
      );}

   updatePatient(id: number, patient: Patient): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, patient) }
}
