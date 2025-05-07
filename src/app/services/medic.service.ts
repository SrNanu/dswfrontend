import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Medic } from '../interfaces/medic.js';



@Injectable({
  providedIn: 'root'
})
export class MedicService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myApiUrl = "api/medics";
    this.myAppUrl = "https://dswbackend-production-163f.up.railway.app/";
  }

  /*getMedics(): Observable<Medic[]> {
    return this.http.get<{ data: Medic[] }>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(
        map(response => response.data) // Extrae el array de la propiedad `data`
      );
  }*/
  getMedics(): Observable<Medic[]> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Realizar la solicitud con las cabeceras configuradas
    return this.http.get<{ data: Medic[] }>(`${this.myAppUrl}${this.myApiUrl}`, { headers })
      .pipe(
        map(response => response.data) // Extraer el array de la propiedad `data`
      );
  }

  getMedico(id: number): Observable<Medic> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<{ data: Medic }>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers })
      .pipe(
        map(response => response.data) // Extrae el objeto de la propiedad `data`
      );
  }

  updateMedico(id: number, medic: Medic): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, medic, { headers });
  }

  deleteMedico(id: number): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers });

  }

  addMedico(medic: Medic): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, medic, { headers });
  }
}

