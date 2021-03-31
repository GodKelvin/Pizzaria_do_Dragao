import { Injectable } from '@angular/core';
//import { Usuario } from '../models/user.model';
import { AuthService } from './auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //private url: string = "http://localhost:5000";
  private helper = new JwtHelperService();

  //private usuarioLogado: Usuario;
  public id_usuario_logado: number;
  constructor(private authService: AuthService) { }

  public getUsuarioID(): number{
    //remover
    return 1;
    let datauser = this.helper.decodeToken(this.authService.loginResponse.token)
    return datauser?.userId;
  }
}
