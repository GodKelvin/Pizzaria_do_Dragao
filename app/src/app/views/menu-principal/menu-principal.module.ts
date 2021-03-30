import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPrincipalRoutingModule } from './menu-principal-routing.module';
import { MenuPrincipalComponent } from './menu-principal.component';
import { DxDataGridModule, DxTabPanelModule } from 'devextreme-angular';
import { PedidosComponent } from './components/pedidos/pedidos.component';


@NgModule({
  declarations: [MenuPrincipalComponent, PedidosComponent],
  imports: [
    CommonModule,
    MenuPrincipalRoutingModule,
    DxDataGridModule,
    DxTabPanelModule
  ]
})
export class MenuPrincipalModule { }
