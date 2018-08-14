import { Component, OnInit } from '@angular/core';
import { CompanyApiService } from '../../services/companyAPI/company-api.service';
import { toast } from '../../../../node_modules/angular2-materialize';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-opening-listing',
  templateUrl: './opening-listing.component.html',
  styleUrls: ['./opening-listing.component.css']
})
export class OpeningListingComponent implements OnInit {

  companies = [];
  openingList = [];

  constructor(
      private companyAPIService : CompanyApiService,
      private router : Router) { }

  ngOnInit() {
    this.companyAPIService.getAllPublicOpenings().subscribe( resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      this.companies = resp.companies;
      this.companies.forEach( company => {
        company.openings.forEach( opening => {
          opening['link'] = 'companyProfile/' + company._id + '/opening/'+ opening._id;
          this.openingList.push(opening);
        });
      });
    });
  }

  openingClicked(link){
    this.router.navigate([link]);
  }

}
