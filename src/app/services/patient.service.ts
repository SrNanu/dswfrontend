import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Attention } from '../interfaces/attention.js';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private myApiUrl: string;
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myApiUrl = "api/patients";
    this.myAppUrl = "https://dswbackend-production-163f.up.railway.app/";
  }

  // Obtiene todos los pacientes
  getPatients(): Observable<Patient[]> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ message: string; data: Patient[] }>(`${this.myAppUrl}${this.myApiUrl}`, { headers })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Elimina un paciente por ID
  deletePatient(id: number): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Agrega un nuevo paciente
  addPatient(patient: Patient): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, patient, { headers })
      .pipe(catchError(this.handleError));
  }

  // Obtiene un paciente por ID
  getPatient(id: number): Observable<Patient> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ data: Patient }>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Actualiza un paciente por ID
  updatePatient(id: number, patient: Patient): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, patient, { headers })
      .pipe(catchError(this.handleError));
  }

  // Obtiene un paciente por DNI
  getPatientByDni(dni: string): Observable<Patient> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ data: Patient }>(`${this.myAppUrl}${this.myApiUrl}/dni/${dni}`, { headers })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  getAttentionsForOneMedic(patientId: number): Observable<Attention[]> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ data: Attention[] }>(`${this.myAppUrl}${this.myApiUrl}/${patientId}/attentions`, { headers })
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

  // Buscar pacientes por nombre, apellido o DNI y mostrarlos en el autocomplete
  searchPatients(term: string): Observable<Patient[]> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ data: Patient[] }>(`${this.myAppUrl}${this.myApiUrl}//${term}`, { headers })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

}
