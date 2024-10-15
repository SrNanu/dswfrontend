import { HttpClient } from '@angular/common/http';
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
    this.myApiUrl = "api/Medics";
    this.myAppUrl = "http://localhost:3000/";
  }

  getMedics() : Observable<Medic[]> {
    return this.http.get<{data: Medic[]}>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(
        map(response => response.data) // Extrae el array de la propiedad `data`
      );
  }


  deleteMedico(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);

  }

  addMedico(medic: Medic): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, medic);
  }
}
