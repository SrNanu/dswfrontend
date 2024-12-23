import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Attention } from '../interfaces/attention';

@Injectable({
  providedIn: 'root'
})
export class AttentionService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/attention';
  }

  getAttentions(): Observable<Attention[]> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<{ data: Attention[] }>(`${this.myAppUrl}${this.myApiUrl}`,{headers})
      .pipe(
        map(response => response.data)
      );
  }

  deleteAttention(id: number): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`,{headers});
  }

  addAttention(anAttention: Attention): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, anAttention,{headers});
  }

  getAttention(id: number): Observable<Attention> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ message: string; data: Attention }>(`${this.myAppUrl}${this.myApiUrl}/${id}`,{headers})
    .pipe(
      map(response => response.data)
    );
  }

  updateAttention(id: number, anAttention: Attention): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, anAttention,{headers});
  }

  getAttentionsByPatientId(patientId: number): Observable<Attention[]> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ data: Attention[] }>(`${this.myAppUrl}${this.myApiUrl}/ByPatient/${patientId}`,{headers})
      .pipe(
        map(response => response.data)
      );
  }


}
