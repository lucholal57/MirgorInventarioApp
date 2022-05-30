import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username = "";
  public password = "";

  public logueado_nombre="";

  constructor(
    private servicioLogin : LoginService,
    private alertas : AlertService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const user =  {username:this.username, password:this.password}
    this.servicioLogin.login(user).subscribe(
      (res) => {
        console.log(res.token + "Este es el TOKEN QUE TRAE cuando manda el ususario")
        localStorage.setItem("token", res.token )
        //Despues de setear y almacenar el token a localstorage, con router nos redirigimos a la pagina dhasboard y recargamos una ves dentro por que si no recargamos no detecta el TOKEN.
        this.router.navigateByUrl('dashboard').then(() =>{
          window.location.reload();
        })
      },
      (error) => {
        this.alertas.alertLogin()
      }
    )
  }

}

