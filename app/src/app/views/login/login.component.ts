import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/resources/models/login.model';
import { LoginService } from 'src/app/resources/services/login.service';
import { AccountService } from 'src/app/resources/services/account.service';
import {Usuario} from '../../resources/models/user.model';
import {notificacao} from '../../resources/utils/UtilsUI';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public dataLogin: Login;
  public dataNewuser: Usuario;
  public showPopUp: boolean = false;

  constructor(
    private loginService: LoginService, 
    private accountService: AccountService,
    private router: Router) { 
    
  }

  ngOnInit(): void {
    this.setDataLogin();
    this.setDataNewUser();
  }

  public setDataLogin(): void{
    this.dataLogin = {
      senha: "",
      email: ""
    };
  }

  public setDataNewUser(): void{
    this.dataNewuser = {
      nome_usuario: "",
      senha: "",
      confirmar_senha: "",
      email: "",
      cpf: "",
      data_nascimento: new Date(),
      telefone: "",
      tipo_usuario: 2
    };
  }


  public login():void {
    if(this.dataLogin.email != "" && this.dataLogin.senha !== ""){
      this.loginService.login(this.dataLogin)
      .subscribe(res => {
        //Trocar de rota
        this.router.navigate(['menu-principal']);
      }, _error => {
        console.log("ERROR: ", _error);
        notificacao("Email ou Senha inválidos", "error");
      });
    }else{
      notificacao("Favor preencher Email e Senha", "warning");
    }
  }

  public showPopUpCriarConta(): void{
    this.showPopUp = !this.showPopUp;
  }

  public criarConta(): void{
    if(this.checkFormsisValid(this.dataNewuser)){
      if(this.dataNewuser.senha == this.dataNewuser.confirmar_senha){
        this.accountService.createAccount(this.dataNewuser)
        .subscribe(_res => {
          this.setDataNewUser();
          notificacao("Conta criada com Sucesso", "success");
          this.showPopUpCriarConta();
        }, error => {
          if(error.type == "email") notificacao("Email já utilizado, tente outro", "warning");
          else notificacao("Não foi possível criar sua conta, por favor, tente mais tarde", "error");
        });
      }else{
        notificacao("Senhas não conferem", "warning");
      }
    }else{
      notificacao("Favor preencher todos os campos", "warning");
    }
  }

  private checkFormsisValid(objetoForm: Object): boolean{
    for(let key in objetoForm){
      if(objetoForm[key] == "" || objetoForm[key] == null) return false
    }
    return true;
  }
}
