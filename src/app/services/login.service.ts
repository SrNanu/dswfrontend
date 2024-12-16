import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserBase } from '../interfaces/userBase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/login'
  }
  logIn(user: UserBase): Observable<any> { 
    return this.http.post(this.myAppUrl + this.myApiUrl, user)
  } 
}


  


