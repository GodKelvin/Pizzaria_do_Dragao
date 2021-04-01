import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

constructor(private authService: AuthService) { }
  canActivate(): boolean {
    //Verifica se esta autenticado antes de acessar as rotas protegidas
    return this.authService.isAuthenticate();
  }

}
