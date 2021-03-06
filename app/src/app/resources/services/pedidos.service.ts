import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NovoPedido, Pedido } from '../models/pedido.model';
import { Pizza } from '../models/pizza.model';
import { UsuarioService } from './usuario.service';
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private url: string = environment.urlAPI;
  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  public getPedidosUsuario(): Observable<Pedido[]>{
    let idUser = this.usuarioService.getUsuarioID();
    return this.http.get<Pedido[]>(`${this.url}/pedidos/user/${idUser}`);
  }

  public getDetalhesPedido(id_pedido: string): Observable<any>{
    return this.http.get<any>(`${this.url}/pedidos/details/${id_pedido}`);
  }

  public getPizzasDetails(): Observable<Pizza[]>{
    return this.http.get<Pizza[]>(`${this.url}/pizzas-details`);
  }

  public postPedido(pedido: NovoPedido): Observable<any>{
    return this.http.post<any>(`${this.url}/pedidos`, pedido);
  }

  public deletePedido(id_pedido: string): Observable<any>{
    return this.http.delete<any>(`${this.url}/pedidos/${id_pedido}`);
  }

  

}
