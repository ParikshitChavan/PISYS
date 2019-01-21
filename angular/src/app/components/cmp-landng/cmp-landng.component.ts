import { Component, OnInit, EventEmitter} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CompanyApiService } from '../../services/companyAPI/company-api.service';
import { toast, MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cmp-landng',
  templateUrl: './cmp-landng.component.html',
  styleUrls: ['./cmp-landng.component.css']
})
export class CmpLandngComponent implements OnInit {
  newCmp: {
    name: string,
    phNum: string,
    admin: { adminName: string, adminEmail: string },
    tandc: Boolean
  } = {name: "", phNum:"", admin: {adminName: "", adminEmail: ""}, tandc: false};
  regError = ''; 

  loginAdmin : {
    email : String,
    password: String
  } = { email:'', password:'' };
  loginError = '';

  regModalAction = new EventEmitter<string|MaterializeAction>();
  loginModalAction = new EventEmitter<string|MaterializeAction>();

  constructor(private authService: AuthService,
      private companyService: CompanyApiService,
      private router: Router
    ) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/company/myCompany']);
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

  onLoginClicked(formValid){
    if(!formValid) return false;
    this.authService.adminLogin(this.loginAdmin).subscribe(resp =>{
      if(!resp.success){
        this.loginError = resp.message;
        //toast('some error occurred please check the console for more details', 3000);
        //console.log(resp.error);
      }
      this.authService.loginSuccess(resp);
      this.router.navigate(['company/myCompany']);
    });
  }

  onRegisterClicked(form){
    if(!form.valid) return false;
    this.companyService.createCompany(this.newCmp).subscribe(resp =>{
      if(!resp.success){
        toast('some error occurred please check the console for more details', 3000);
        console.log(resp.error);
      }
      this.newCmp = { name: "", phNum: "", admin: { adminName: "", adminEmail: "" }, tandc: false };
      form.resetForm();
      toast('Company registered successfully, Please check your email for an access link', 3000);
      this.onLoginOpen();
    });
  }
}
