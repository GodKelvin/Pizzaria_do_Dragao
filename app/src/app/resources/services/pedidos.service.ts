import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private url: string = "http://localhost:5000";
  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  public getPedidosUsuario(): Observable<Pedido[]>{
    let idUser = this.usuarioService.getUsuarioID();
    console.log("IDUSER: ", idUser);
    return this.http.get<Pedido[]>(`${this.url}/pedidos/user/${idUser}`);
  }

  

}
