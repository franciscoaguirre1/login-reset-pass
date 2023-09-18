import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye slash";
  loginForm!: any;
  username: any;
  pass: any;  

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }


  login() {
    if (!this.username || !this.pass) {
      alert("falta pass o username")
      } 
    else {
      this.auth.login(this.username, this.pass)
      .then((res: any) => {
        if (res.access_token) {
          localStorage.setItem("access_token", res.access_token);
          this.router.navigate(['/bco-registrar-personas']);
        } else {
          alert(res.error);
        }
      })
    }
    
  }

}
