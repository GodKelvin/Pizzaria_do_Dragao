import { Component, OnInit, ViewChild } from '@angular/core';
import { DetalhesPedido, Pedido } from 'src/app/resources/models/pedido.model';
import { Pizza } from 'src/app/resources/models/pizza.model';
import { PedidosService } from 'src/app/resources/services/pedidos.service';
import { notificacao } from 'src/app/resources/utils/UtilsUI';
import { DxDataGridComponent} from 'devextreme-angular';
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

  constructor(private pedidosService: PedidosService) { }

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
    console.log("NOVO PEDIDO");
    let cdsPizza = [];
    this.listaPizzasDataPedido.forEach(dataPizza => {
      cdsPizza.push(dataPizza.cd_pizza);
    });

    console.log("CODIGOS PIZZA: ", cdsPizza);
   
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

  public onToolbarPreparingFinalizarPedido(event: any):void{
    event.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'food',
          text: 'Realizar Pedido',
          type:"success",
          onClick: this.novoPedido.bind(this)
        }
      },
    );
  }

  public removerItemPedido(event: any){
    console.log("REMOVER: ", event);
    console.log("LISTA: ", this.listaPizzasDataPedido);
    if(event && event.data){
      this.totalPedido -= event.data.preco;
    }
  }


}
