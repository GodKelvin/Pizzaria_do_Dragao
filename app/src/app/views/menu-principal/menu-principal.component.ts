import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/resources/services/auth.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
        icon: 'menu',
        onClick: () => this.isDrawerOpen = !this.isDrawerOpen
    }
  }];

  isDrawerOpen: Boolean = true;
  public opcaoAtual: number = 0;

  public abasPrincipais: any[] = [];
  constructor(private authService: AuthService, private router: Router) { }

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

  public changeOption(event: any): void{
    this.opcaoAtual = event.addedItems[0]?.id;
    if(this.opcaoAtual == 2){
      this.authService.clear();
      this.router.navigate(['']);
    }
  }
}

