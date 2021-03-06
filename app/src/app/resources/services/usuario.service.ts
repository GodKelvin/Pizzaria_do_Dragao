import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Password } from '../models/user.model';
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = environment.urlAPI;
  private helper = new JwtHelperService();

  //private usuarioLogado: Usuario;
  public id_usuario_logado: number;
  constructor(private authService: AuthService, private http: HttpClient, ) { }

  public getUsuarioID(): number{
    let datauser = this.helper.decodeToken(this.authService.loginResponse.token)
    return datauser?.userId;
  }

  public getDataUser(): Observable<any>{
    return this.http.get<any>(`${this.url}/usuario`);
  }

  public putPassword(dataPass: Password): Observable<any>{
    return this.http.put<any>(`${this.url}/usuario-pass`, dataPass);
  }
}
