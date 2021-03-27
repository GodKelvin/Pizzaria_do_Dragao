import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/resources/models/login.model';
import { LoginService } from 'src/app/resources/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public dataLogin: Login;

  constructor(private loginService: LoginService) { 
    this.setDataLogin();
  }

  ngOnInit(): void {
  }

  public setDataLogin(): void{
    this.dataLogin = {
      senha: "",
      email: ""
    };
  }


  public login():void {
    console.log("LOGIN: ", this.dataLogin);
    if(this.dataLogin.email != "" && this.dataLogin.senha !== ""){
      this.loginService.login(this.dataLogin)
      .subscribe(res => {
        console.log("RES: ", res);
      }, error => {
        console.log("ERROR: ", error);
      });
    }
  }
}
