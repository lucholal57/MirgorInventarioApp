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
        console.log(res.token)
        localStorage.setItem("token", res.token )
        this.router.navigateByUrl('dashboard')
      },
      (error) => {
        this.alertas.alertLogin()
      }
    )
  }
  /*
  if (this.username ==="admin" && this.password ==="admin")
  {
    this.router.navigateByUrl('dashboard')
  }
  else{
    this.alertas.alertLogin()
    this.password=""
    }
    */

}

