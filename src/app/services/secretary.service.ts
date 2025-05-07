import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secretary } from '../interfaces/secretary';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecretaryService {
  private myApiUrl: String;
  private myAppUrl: String;

  constructor(private http: HttpClient) {
    this.myApiUrl = 'api/secretaries';
    this.myAppUrl = 'https://dswbackend-production-163f.up.railway.app/';
  }

  getSecretarys(): Observable<Secretary[]> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<{ data: Secretary[] }>(`${this.myAppUrl}${this.myApiUrl}`, {
        headers,
      })
      .pipe(
        map((response) => response.data) // Extrae el array de la propiedad `data`
      );
  }
  deleteSecretary(id: number): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, {
      headers,
    });
  }

  addSecretary(secretary: Secretary): Observable<void> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, secretary, { headers }).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error("Error al agregar secretaria:", error.error.message || error.message);
      return throwError(() => new Error(error.error.message || "Error desconocido al agregar secretaria."));
    })
  );
}


  getSecretary(id: number): Observable<Secretary> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<{ data: Secretary }>(`${this.myAppUrl}${this.myApiUrl}/${id}`, {
        headers,
      })
      .pipe(
        map((response) => response.data) // Extrae el objeto de la propiedad `data`
      );
  }

  updateSecretary(id: number, secretary: Secretary): Observable<void> {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`,
      secretary,
      { headers }
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado. Intente nuevamente.';

    if (error.error instanceof ErrorEvent) {
      // Error de cliente o red
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del backend
      if (error.status === 400) {
        errorMessage = error.error.message; // Captura el mensaje enviado desde el backend
      } else if (error.status === 401) {
        errorMessage = 'No autorizado. Inicie sesión nuevamente.';
      } else if (error.status === 500) {
        errorMessage = 'Error interno del servidor.';
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
