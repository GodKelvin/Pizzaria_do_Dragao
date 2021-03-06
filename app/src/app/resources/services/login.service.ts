import { Injectable } from '@angular/core';
import {HttpClient, HttpBackend} from '@angular/common/http';
import { Login, ResponseLogin } from '../models/login.model';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = environment.urlAPI;
  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    //Utilizado para nao passar pelo interceptor, visto que no login nao precisamos de enviar o token
    handler: HttpBackend) { 
      this.http = new HttpClient(handler);
    }

  public login(body: Login): Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(`${this.url}/login`, body)
    .pipe(tap((loginResponse) => {
      //Quando login for feito com sucesso, armazena o token e o cd_usuario
      this.authService.loginResponse = loginResponse;
    }));
  }
}
