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
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiWmUgZG8gY2FpeGFvIiwiaWF0IjoxNjE3MjgwMjE5LCJleHAiOjE2MTczNjY2MTl9.JFjJKWjm1rQBt3HpZdTV1Zw-a5dBYFoMCIPlG7P6FdM';
    return this.loginResponse?.token;
  }

}
