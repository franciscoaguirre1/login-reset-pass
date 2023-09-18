import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye slash";
  firstName: any
  lastName: any
  email: any
  userName: any
  password: any
  signUpForm!: any;


  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }

  onSignup() {
    console.log(this.signUpForm);
    if (this.signUpForm) {
      this.auth.signUp(this.firstName, this.lastName, this.email, this.userName, this.password)
        .then((res: any) => {
            alert(res.messsage);
            this.signUpForm.reset();
            this.router.navigate(['login']);
            
          })
        }
          else {
      alert("Your form is invalid");
    }
  }


} 
