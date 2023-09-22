import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsersApiService } from 'src/app/services/users-api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye slash";
  usuario:any =  {}


  constructor(private auth: UsersApiService, private router: Router) {}

  ngOnInit(): void {}

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }

  registrarse() {
    console.log("usuario desde signup.component.ts",this.usuario);
    if (this.usuario) {
      this.auth.crearUsuario(this.usuario)
        .then((res: any) => {
            alert(res.resMsg);
            this.usuario.reset();
            this.resetForm();
            this.router.navigate(['/login']);
            return
          })
        }
          else {
      alert("Your form is invalid");
    }
  }


  resetForm() {
    this.usuario = {
      nombre: '',
      apellido: '',
      email: '',
      nombreUsuario: '',
      password: '',
      password2: ''
    };
  }


} 
