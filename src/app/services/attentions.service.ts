import { HttpClient } from '@angular/common/http';
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
    return this.http.get<{ data: Attention[] }>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(
        map(response => response.data)
      );
  }

  deleteAttention(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  addAttention(anAttention: Attention): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, anAttention);
  }

  getAttention(id: number): Observable<Attention> {
    return this.http.get<{ message: string; data: Attention }>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
    .pipe(
      map(response => response.data)
    );
  }

  updateAttention(id: number, anAttention: Attention): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, anAttention);
  }

  getAttentionsByPatientId(patientId: number): Observable<Attention[]> {
    return this.http.get<{ data: Attention[] }>(`${this.myAppUrl}${this.myApiUrl}/ByPatient/${patientId}`)
      .pipe(
        map(response => response.data)
      );
  }


}
