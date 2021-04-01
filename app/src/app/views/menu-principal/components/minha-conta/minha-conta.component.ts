import { Component, OnInit } from '@angular/core';
import { Password, Usuario } from 'src/app/resources/models/user.model';
import { UsuarioService } from 'src/app/resources/services/usuario.service';
import { notificacao } from 'src/app/resources/utils/UtilsUI';



@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {

  public dataUser: Usuario;
  public formPass: Password;
  public showPopUp: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.setDataPass();
    this.getDataUser();
  }

  private getDataUser(): void{
    this.usuarioService.getDataUser()
    .subscribe(res => {
      this.dataUser = res[0];
    }, _error => {
      notificacao("Falha ao obter dados do usuário", "error");
    })
  }

  private setDataPass(): void{
    this.formPass = {
      senha: "",
      confirmar_senha: ""
    };
  }

  public showPopUpAlterarSenha(): void{
    this.showPopUp = !this.showPopUp;
  }

  public alterarSenha(): void{
    if(this.formPass.senha == "" || this.formPass.confirmar_senha == ""){
      notificacao("Favor preencher todos os campos", "warning");
    }else if(this.formPass.senha != this.formPass.confirmar_senha){
      notificacao("Senhas não conferem", "warning");
    }else{
      this.usuarioService.putPassword(this.formPass)
      .subscribe(res => {
        notificacao("Senha alterada com sucesso", "success");
      }, _error => {
        notificacao("Erro ao alterar senha, por favor, tente mais tarde", "error");
      })
    }
  }
}
