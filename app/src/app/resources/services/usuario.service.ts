import { Injectable } from '@angular/core';
import { Usuario } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = "http://localhost:5000";
  //private usuarioLogado: Usuario;
  public id_usuario_logado: number;
  constructor(private authService: AuthService) { }

  public getUsuarioID(): number{
    return this.id_usuario_logado;
  }
}
