import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Login, ResponseLogin } from '../models/login.model';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "http://localhost:5000";
  constructor(private http: HttpClient, private authService: AuthService) { }

  public login(body: Login): Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(`${this.url}/login`, body)
    .pipe(tap((loginResponse) => {
      //Quando login for feito com sucesso, armazena o token
      this.authService.loginResponse = loginResponse;
    }));
  }
}
