import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyApiService } from '../../services/companyAPI/company-api.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  companyId: string;
  cmpProfile = {
    name: '',
    est: '',
    address: '',
    abtUs: '',
    logo: {key: '', url: ''},
    website: ''
  }

  constructor(
    private companyAPIService: CompanyApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('cmpId');
    this.companyAPIService.getRecruitmentPage(this.companyId).subscribe(resp=>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      this.cmpProfile = resp.recruitmentDetails;
    });
  }
}
