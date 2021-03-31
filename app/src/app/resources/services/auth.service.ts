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
    //console.log("TOKENDECODE: ", this.helper.decodeToken(this.loginResponse.token))
    //remover
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiS2VsdmluIExlaHJiYWNrIiwiaWF0IjoxNjE3MTkzNTc4LCJleHAiOjE2MTcyNzk5Nzh9.DAvteiroJ3Sw-xvosAKsiRIAkKoqBsGSa6YftyguIQM';
    return this.loginResponse?.token;
  }

}
