import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  submitted: boolean = false;

  constructor(private authService:AuthService) { }

  ngOnInit() { }

  onForgotPasswordSubmit(validForm:boolean){
    if(!validForm) return false;
    this.authService.forgotPasswordInit(this.email).subscribe(resp=>{
      if(!resp.success){
        console.log(resp.console.error);
        return toast('Some error occurred, check console for more details.');
      }
      this.submitted = true;
    });
  }

}
