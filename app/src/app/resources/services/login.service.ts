import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Login, ResponseLogin } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "http://localhost:5000";
  constructor(private http: HttpClient) { }

  public login(body: Login): Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(`${this.url}/login`, body);
  }
}
