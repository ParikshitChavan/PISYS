import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  registerUser = {
    name: "",
    email: "",
    DOB: "",
    password: "",
    cnfPass: "",
    phNum: ""
  }

  loginUser = {
    loginEmail: "",
    loginPassword: ""
  }

  regMessage :String;
  loginMessage :String;
  
  regSubmitted = false;
  loginSubmitted = false;
  loginError = false; 

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() { 
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }

  onRegisterUser(validForm: boolean){
    if(!validForm) return false;
    this.regSubmitted = true;
    const user = this.registerUser;
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) this.regMessage = "User Registered successfully and can now login";
      else this.regMessage = "User registration failed. Please try agin later. If the error persists Please contact our support."
    });
  }

  onLoginUser(validForm: boolean){
    if(!validForm) return false;
    this.loginSubmitted = true;
    const user = {email:this.loginUser.loginEmail, password: this.loginUser.loginPassword};
    this.authService.login(user).subscribe(data => {
      if(data.success) {
        this.authService.loginSuccess(data);
        this.router.navigate(['dashboard']);
      }
      else {
        this.loginError = true;
        this.loginMessage = data.message;
        this.loginSubmitted = false;
      }
    });
  }
}
