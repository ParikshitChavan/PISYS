import { Component, OnInit, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { CompanyApiService } from "../../services/companyAPI/company-api.service";
import { toast, MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  autocompleteData = {};
  autocompleteActions = new EventEmitter<string|MaterializeAction>();
  modalActions = new EventEmitter<string|MaterializeAction>();
  autocompleteParams = [{
    data: this.autocompleteData,
    'onAutocomplete': (val) => {
      for(let i=0; i < this.loadedCmps.length; i++){
        if(val == this.loadedCmps[i].name){
          this.router.navigate(['company/'+ this.loadedCmps[i]._id]);
          break;
        } 
      }
    }
  }];
  newCmp: {
    name: string,
    est: any,
    address:any,
    admin: {adminName:string, adminEmail:string},
    phNum: string
  } = {name: "", est: "", address: "", admin: {adminName: "", adminEmail: ""}, phNum:""};
  newCmpMsg = "";
  loadedCmps = [];

  constructor(private companyAPIService: CompanyApiService, private router:Router) { }

  ngOnInit() {
    this.companyAPIService.getCmpNames().subscribe(resp => {
      if(!resp.success) return toast("Companies did not load, please try again later", 3000);
      this.loadedCmps = resp.companies;
      let cmpLength = this.loadedCmps.length;
      for(let i=0; i<cmpLength; i++){
        this.autocompleteData[this.loadedCmps[i].name] = null;
      }
      setTimeout(()=>{
        this.autocompleteActions.emit("autocomplete");
      });
    }, err => {
      console.log(err);
      return false;
    });
  }

  cmpCreateSubmit(formValid:Boolean){
    if(!formValid) return false;
    this.companyAPIService.createCompany(this.newCmp).subscribe(resp =>{
      resp.success ? this.newCmpMsg = "New company created successfully" : this.newCmpMsg = "Some error occurred, check console for more details.";
      this.modalActions.emit({action:"modal",params:['close']});
      toast(this.newCmpMsg, 3000);
    });
  }

  openCompanyPage(){

  }

}
