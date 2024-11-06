import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private myApiUrl: string;
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myApiUrl = "api/Patients";
    this.myAppUrl = "http://localhost:3000/";
  }

  // Obtiene todos los pacientes
  getPatients(): Observable<Patient[]> {
    return this.http.get<{ message: string; data: Patient[] }>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Elimina un paciente por ID
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Agrega un nuevo paciente
  addPatient(patient: Patient): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, patient, { headers })
      .pipe(catchError(this.handleError));
  }

  // Obtiene un paciente por ID
  getPatient(id: number): Observable<Patient> {
    return this.http.get<{ data: Patient }>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Actualiza un paciente por ID
  updatePatient(id: number, patient: Patient): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, patient, { headers })
      .pipe(catchError(this.handleError));
  }

  // Obtiene un paciente por DNI
  getPatientByDni(dni: string): Observable<Patient> {
    return this.http.get<{ data: Patient }>(`${this.myAppUrl}${this.myApiUrl}/dni/${dni}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Ha ocurrido un error:', error);
    return throwError('Algo salió mal; por favor, inténtelo nuevamente más tarde.');
  }
}
