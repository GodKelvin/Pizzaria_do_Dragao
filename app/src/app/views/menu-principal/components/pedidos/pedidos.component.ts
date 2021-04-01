import { Component, OnInit, ViewChild } from '@angular/core';
import { DetalhesPedido, NovoPedido, Pedido } from 'src/app/resources/models/pedido.model';
import { Pizza } from 'src/app/resources/models/pizza.model';
import { PedidosService } from 'src/app/resources/services/pedidos.service';
import { notificacao } from 'src/app/resources/utils/UtilsUI';
import { DxDataGridComponent} from 'devextreme-angular';
import { UsuarioService } from 'src/app/resources/services/usuario.service';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  @ViewChild('dataGridPizzas') dataGridPizzasSelecionadas: DxDataGridComponent;

  public pedidosUsuario: Pedido[];
  public detalhesPizzas: Pizza[];
  public detalhesPedido: DetalhesPedido;

  public popupNovoPedido: boolean = false;
  public gridBoxPedidos: number[] = [];
  public ingredientesPizzaSelecionada: any[] = [];

  //public listaPizzasPedido: number[] = [];
  public listaPizzasDataPedido: any[] = [];

  public totalPedido: number = 0;
  public optionsButtonNovoPedido: any =
  {
    icon: 'food',
    text: 'Realizar Pedido',
    type:"success",
    onClick: this.novoPedido.bind(this)
    
  };

  constructor(
    private pedidosService: PedidosService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getPizzasDetails();
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

  public getDetalhesPedido(event: any): void{
    if(event?.row?.key){
      let id_pedido = event?.row?.key;
      this.pedidosService.getDetalhesPedido(id_pedido)
      .subscribe(res => {
        this.detalhesPedido = res[0].listapizzaspedidos;
        console.log(this.detalhesPedido)
      }, _error => {
        notificacao("Falha ao obter detalhes do pedido", "error");
      })
    }
  }

  private getPizzasDetails(): void{
    this.pedidosService.getPizzasDetails()
    .subscribe(res => {
      this.detalhesPizzas = res;
    }, _error => {
      notificacao("Falha ao obter detalhes das pizzas", "error");
    });
  }

  public onToolbarPreparingPedidos(event: any):void{
    event.toolbarOptions.items.unshift(
      {
        location: 'center',
        text: "Pedidos"
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          width: 136,
          text: 'Novo Pedido',
          type:"success",
          onClick: this.showPopupNovoPedido.bind(this)
        }
      }, 
      {
        location: 'before',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          hint: "Atualizar",
          onClick: this.getPedidosUsuario.bind(this)
        }
      }
    );
  }

  public onToolbarPreparingDetalhesPedido(event: any): void{
    event.toolbarOptions.items.unshift(
      {
        location: 'center',
        text: "Pizzas do pedido"
      },
    );
  }

  private showPopupNovoPedido(): void{
    this.popupNovoPedido = !this.popupNovoPedido;
  }

  public adicionarAoCarrinhoPizzas(): void{
    //Array de envio para o post
    //this.listaPizzasPedido = this.listaPizzasPedido.concat(this.dataGridPizzasSelecionadas.instance.getSelectedRowKeys());

    //Array de lookup no datagrid
    this.listaPizzasDataPedido = this.listaPizzasDataPedido.concat(this.dataGridPizzasSelecionadas.instance.getSelectedRowsData());
    
    this.dataGridPizzasSelecionadas.instance.getSelectedRowsData().forEach(pizza => {
      this.totalPedido += pizza.preco;
    })
  }

  public novoPedido(): void{
    if(this.listaPizzasDataPedido.length < 1){
      notificacao("Favor escolher pelo menos uma pizza", "warning");
      return;
    }
    let cdsPizza: number[] = [];
    this.listaPizzasDataPedido.forEach(dataPizza => {
      cdsPizza.push(dataPizza.cd_pizza);
    });

    console.log(new Date().toISOString());

    let novoPedido: NovoPedido = {
      lista_pizza: cdsPizza,
      valor_pedido: this.totalPedido,
      cd_usuario: this.usuarioService.getUsuarioID(),
      data_pedido: new Date().toISOString()
    }

    this.pedidosService.postPedido(novoPedido)
    .subscribe(_res => {
      this.totalPedido = 0;
      this.listaPizzasDataPedido = [];
      this.getPedidosUsuario();
      notificacao("Pedido realizado com sucesso", "success");
    }, _error => {
      notificacao("Erro ao realizar pedido, por favor, tente mais tarde", "error");
    })

   
  }

  public seeIngredientesPizza(event: any): void{
    if(event.row && event.row.data){
      this.ingredientesPizzaSelecionada = event.row.data.listaingredientespizza;
    }
  }

  public onToolbarPreparingPizzas(event: any):void{
    event.toolbarOptions.items.unshift(
      {
        location: 'before',
        widget: 'dxButton',
        options: {
          icon: 'cart',
          text: 'Adcionar pizzas selecionadas ao pedido',
          type:"success",
          onClick: this.adicionarAoCarrinhoPizzas.bind(this)
        }
      }
    );
  }

  public removerItemPedido(event: any){
    if(event && event.data){
      this.totalPedido -= event.data.preco;
    }
  }

  public deletePedido(event: any): void{
    console.log("PEDIDO DEL: ", event);
    if(event && event.data){
      let id_pedido = event.data.cd_pedido;
      console.log("ID PEDIDO: ", id_pedido);
      this.pedidosService.deletePedido(id_pedido)
      .subscribe(res => {
        console.log("RES: ", res);
        this.ingredientesPizzaSelecionada = [];
        notificacao("Pedido cancelado com sucesso", "success");
      }, _error => {
        notificacao("Erro ao cancelar pedido", "error");
      });
    }
  }


}
