import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import { toast } from 'angular2-materialize';

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

  onRegisterUser(form){
    if(!form.valid) return false;
    this.regSubmitted = true;
    const user = this.registerUser;
    this.authService.registerUser(user).subscribe(resp => {
      if(resp.success) {
        this.registerUser = {
          name: "",
          email: "",
          DOB: "",
          password: "",
          cnfPass: "",
          phNum: ""
        }
        form.resetForm();
        toast("User Registered successfully and can now login", 3000);
      } 
      else{
        this.regMessage = "User registration failed. check console for more details.";
        console.log(resp.error);
      } 
    });
  }

  onLoginUser(validForm: boolean){
    if(!validForm) return false;
    this.loginSubmitted = true;
    const user = {email:this.loginUser.loginEmail, password: this.loginUser.loginPassword};
    this.authService.login(user).subscribe(resp => {
      if(resp.success) {
        this.authService.loginSuccess(resp);
        this.router.navigate(['dashboard']);
      }
      else {
        this.loginError = true;
        this.loginMessage = resp.message;
        this.loginSubmitted = false;
      }
    });
  }
}
