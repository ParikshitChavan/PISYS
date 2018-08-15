import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyApiService } from '../../services/companyAPI/company-api.service';
import { toast, MaterializeAction } from 'angular2-materialize';

declare let Materialize:any;

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  companyId: string;
  modalActions = new EventEmitter<string|MaterializeAction>();
  cmpProfile = {
    name: '',
    est: '',
    address: '',
    abtUs: '',
    logo: {key: '', url: ''},
    website: ''
  }
  editRights = false;
  editingCmpProfile = {
    abtUs: ''
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
      this.editRights = resp.editRights;
      this.editingCmpProfile.abtUs = this.cmpProfile.abtUs;
      setTimeout(()=>{
        Materialize.updateTextFields();
      })
    });
  }

  updateAbtUs(){
    this.companyAPIService.updateAbtUs(this.companyId, this.editingCmpProfile.abtUs).subscribe( resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      this.modalActions.emit({action:"modal", params:['close']});
      this.cmpProfile.abtUs = this.editingCmpProfile.abtUs;
    });
  }

}
