import { Component, OnInit } from '@angular/core';
import { CompanyApiService } from '../../services/companyAPI/company-api.service';
import { toast } from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cnadi-shrtlst',
  templateUrl: './cnadi-shrtlst.component.html',
  styleUrls: ['./cnadi-shrtlst.component.css']
})
export class CnadiShrtlstComponent implements OnInit {
  companyId = '';
  candidates = [];
  contacted = [];

  constructor(private companyService: CompanyApiService, private router: Router) { }

  ngOnInit() {
    let localData = JSON.parse(localStorage.getItem('user'));
    this.companyId = localData.company._id;
    this.contacted = localData.company.cntacd;
    this.companyService.getShortlistedCandi(this.companyId).subscribe(resp =>{
      if(!resp.success){
        toast('some error occurred please check the console for more details', 3000);
        console.log(resp.error);
      }
      this.candidates = resp.shortlist;
    });
  }

}
