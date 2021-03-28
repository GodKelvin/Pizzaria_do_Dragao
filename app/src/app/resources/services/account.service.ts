import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url: string = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  public createAccount(dadosNovaConta: Usuario): Observable<any>{
    return this.http.post<any>(`${this.url}/createUser`, dadosNovaConta);
  }

}
