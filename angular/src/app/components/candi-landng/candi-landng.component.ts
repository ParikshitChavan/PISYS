import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import { toast, MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-candi-landng',
  templateUrl: './candi-landng.component.html',
  styleUrls: ['./candi-landng.component.css']
})
export class CandiLandngComponent implements OnInit {
  registerUser = {
    name: "",
    email: "",
    DOB: "",
    password: "",
    cnfPass: "",
    phNum: "",
    tandc: false
  }

  loginUser = {
    loginEmail: "",
    loginPassword: ""
  }

  regSubmitted= false;
  loginSubmitted = false;
  regMessage : String = '';
  loginMessage : String = ''; 

  regModalAction = new EventEmitter<string|MaterializeAction>();
  loginModalAction = new EventEmitter<string|MaterializeAction>();

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() { 
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/profile']);
    }
  }

  onLoginOpen(){
    this.regModalAction.emit({action:"modal", params:['close']});
    this.loginModalAction.emit({action:"modal", params:['open']});
  }

  onRegisterOpen(){
    this.loginModalAction.emit({action:"modal", params:['close']});
    this.regModalAction.emit({action:"modal", params:['open']});
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
          phNum: "",
          tandc: false
        }
        form.resetForm();
        toast("User Registered successfully and can now login", 3000);
        this.onLoginOpen();
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
    const user = { email:this.loginUser.loginEmail, password: this.loginUser.loginPassword };
    this.authService.userLogin(user).subscribe(resp => {
      if(resp.success) {
        this.loginModalAction.emit({action:"modal", params:['close']});
        this.authService.loginSuccess(resp);
        this.router.navigate(['profile']);
      }
      else {
        this.loginMessage = resp.message;
        this.loginSubmitted = false;
      }
    });
  }

  frgtPassClicked(){
    this.loginModalAction.emit({action:"modal", params:['close']});
    this.router.navigate(['forgotPassword']);
  }

}
