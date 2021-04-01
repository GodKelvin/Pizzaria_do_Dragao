import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpBackend} from '@angular/common/http';
import { Usuario } from '../models/user.model';
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url: string = environment.urlAPI;

  constructor(
    private http: HttpClient,
    //Utilizado para nao passar pelo interceptor, visto que no login nao precisamos de enviar o token
    handler: HttpBackend) { 
      this.http = new HttpClient(handler);
    }

  public createAccount(dadosNovaConta: Usuario): Observable<any>{
    return this.http.post<any>(`${this.url}/createUser`, dadosNovaConta);
  }

}
