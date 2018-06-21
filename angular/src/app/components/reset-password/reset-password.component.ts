import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SitelinkApiService } from '../../services/sitelinkAPI/sitelink-api.service';
import { AuthService } from '../../services/auth/auth.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  validLink: boolean = false;
  userData : {
    userId:any,
    newPass: string
  }={userId:null, newPass: ''}
  pass: string;
  cnfPass: string;

  constructor(private activatedRoute: ActivatedRoute,
    private sitelinkAPIService: SitelinkApiService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
    let data = {id: this.activatedRoute.snapshot.params.token};
    this.sitelinkAPIService.validateAccInit(data).subscribe( resp =>{
      if(resp.success){
        this.validLink = true;
        this.userData.userId = resp.userId;   
      } 
      else toast('Some error occurred. Please try again later.',3000);
    });
  }

  passwordResetSubmit(formValid: boolean){
    if(!formValid) return false;
    if(this.pass!=this.cnfPass) return false;
    this.userData.newPass = this.pass;
    this.authService.resetPassword(this.userData).subscribe( resp =>{
      if(!resp.success) {
        toast('Some Error occurred. Please try again later.',3000);
        return null;
      }
      this.authService.loginSuccess(resp);
      this.router.navigate(['/dashboard']);
    });
  }

}
