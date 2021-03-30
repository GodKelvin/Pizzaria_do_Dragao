import { Injectable } from '@angular/core';
import { ResponseLogin } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginResponse: ResponseLogin;

  public clear(): void{
    this.loginResponse = undefined;
  }

  public isAuthenticate(): boolean{
    //So vai ler o token se tiver o loginResponse (se nao for undefined)
    return Boolean(this.loginResponse?.token);
  }

  public getToken(): string{
    return this.loginResponse?.token;
  }

}
