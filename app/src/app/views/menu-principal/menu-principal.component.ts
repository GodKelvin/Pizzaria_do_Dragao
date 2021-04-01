import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  
  text: string;
  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
        icon: 'menu',
        onClick: () => this.isDrawerOpen = !this.isDrawerOpen
    }
  }];
  public navigation: any[] = [
    { id: 1, text: "Products", icon: "product" },
    { id: 2, text: "Sales", icon: "money" },
    { id: 3, text: "Customers", icon: "group" },
    { id: 4, text: "Employees", icon: "card" },
    { id: 5, text: "Reports", icon: "chart" }
  ];

  isDrawerOpen: Boolean = true;
  public opcaoAtual: number = 0;
  ///////////////////////////////////


  public abasPrincipais: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.createAbas();
  }

  private createAbas(): void{
    this.abasPrincipais = [
      {id: 0, text: "Pedidos", icon: "product"},
      {id: 1, text: "Minha Conta", icon: "card"},
      {id: 2, text: "Sair", icon: "close"},
    ];
  
  }

  public teste(event: any): void{
    console.log("OPA: ", event);
    this.opcaoAtual = event.addedItems[0]?.id;
    console.log("OPCAO: ", this.opcaoAtual);
  }
}

