import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPrincipalRoutingModule } from './menu-principal-routing.module';
import { MenuPrincipalComponent } from './menu-principal.component';
import { DxButtonModule, DxDataGridModule, DxDrawerModule, DxDropDownBoxModule, DxListModule, DxPopupModule, DxScrollViewModule, DxTabPanelModule, DxToolbarModule } from 'devextreme-angular';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { MinhaContaComponent } from './components/minha-conta/minha-conta.component';


@NgModule({
  declarations: [MenuPrincipalComponent, PedidosComponent, MinhaContaComponent],
  imports: [
    CommonModule,
    MenuPrincipalRoutingModule,
    DxDataGridModule,
    DxTabPanelModule,
    DxDrawerModule,
    DxToolbarModule,
    DxListModule,
    DxPopupModule,
    DxDropDownBoxModule,
    DxScrollViewModule,
    DxButtonModule
    
  ]
})
export class MenuPrincipalModule { }
