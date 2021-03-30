import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/resources/models/pedido.model';
import { PedidosService } from 'src/app/resources/services/pedidos.service';
import { notificacao } from 'src/app/resources/utils/UtilsUI';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public pedidosUsuario: Pedido[];
  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {

    this.getPedidosUsuario();
  }

  private getPedidosUsuario(): void{
    this.pedidosService.getPedidosUsuario()
    .subscribe(res => {
      this.pedidosUsuario = res;
    }, _error => {
      notificacao("Falha ao obter pedidos", "error");
    });
  }

}
