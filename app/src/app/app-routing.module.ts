import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './resources/services/auth-guard.service';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'menu-principal',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./views/menu-principal/menu-principal.module').then(modulo => modulo.MenuPrincipalModule)
  },
  //Qualquer coisa diferente das rotas declaradas, vai para a rota raiz
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
