import { Component, OnInit, EventEmitter} from '@angular/core';
//import { DatePipe } from '@angular/common';
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
  autocompleteParams = [{ data: this.autocompleteData}];
  newCmp: {
    name: string,
    est: any,
    address:any,
    admin: {adminName:string, adminEmail:string},
    phNum: string
  } = {name:"", est:"", address:"", admin:{adminName:"", adminEmail:""}, phNum:""};
  newCmpMsg = "";

  constructor(private companyAPIService: CompanyApiService, private router:Router) { }

  ngOnInit() {
    this.companyAPIService.getCmpNames().subscribe(resp => {
      if(!resp.success) return false;
      for(let company in resp.companies){
        let name = resp.companies[company].name
        this.autocompleteData = {...this.autocompleteData, ...{name : null}};
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
      resp.success ? this.newCmpMsg = "New company created successfully" : this.newCmpMsg = "Some error occurred, please try agin later.";
      toast(this.newCmpMsg, 3000);
    });
  }

}
