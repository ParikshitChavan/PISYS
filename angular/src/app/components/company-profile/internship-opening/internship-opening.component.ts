import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyApiService } from '../../../services/companyAPI/company-api.service';
import { toast, MaterializeAction } from '../../../../../node_modules/angular2-materialize';

@Component({
  selector: 'app-internship-opening',
  templateUrl: './internship-opening.component.html',
  styleUrls: ['./internship-opening.component.css']
})
export class InternshipOpeningComponent implements OnInit {
  companyId = '';
  openingId = '';
  rqChipsActions = new EventEmitter<string|MaterializeAction>();
  opnChipsActions = new EventEmitter<string|MaterializeAction>();
  openingDetails = {
    _id: '',           // auto assigned Opening id
    sklRq: [],        // Skill required max 5
    sklOp: [],        // optional skills max 5
    descrip: '',      //  Opening and dept description
    rspably: [],      // list of responsibilities
    pblshed: false,   // is a published opening
    achivd: false     // is an archived Opening        
  };

  allITLang = {
    'C++': null,
    'Java': null,
    'JavaScript': null
  };
  allITLangArray = Object.keys(this.allITLang);
  autoCompleteOptions = {
    data: this.allITLang,
    limit: 5,
    minLength: 1
  }
  chipsInit = { autocompleteOptions: this.autoCompleteOptions };
  newOpening = {title: '', descrip:'', rspably:'', sklRq:[], sklOp:[]};
  rqSklChpArr = [];
  opnSklChpArr = [];

  constructor(
    private companyService: CompanyApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.companyId = this.route.parent.snapshot.paramMap.get('cmpId');
    this.openingId = this.route.snapshot.paramMap.get('openId');
    this.companyService.getOpeningDetails(this.companyId, this.openingId).subscribe(resp=>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      this.openingDetails = resp.openingDetails;
    });
  }
  
  addRqSkl(chip) {
    if(this.allITLangArray.includes(chip.tag)){
      this.rqSklChpArr.push({tag: chip.tag});
    }
    else{
      this.rqChipsActions.emit({ action:"material_chip", params:[{data: this.rqSklChpArr, autocompleteOptions: this.autoCompleteOptions}] });
    }    
  }

  deleteRqSkl(chip) {
    this.rqSklChpArr = this.rqSklChpArr.filter(item => item != {tag: chip.tag});
  }

  addOpnSkl(chip) {
    if(this.allITLangArray.includes(chip.tag)){
      this.opnSklChpArr.push({tag: chip.tag});
    }
    else{
      this.opnChipsActions.emit({ action:"material_chip", params:[{data: this.opnSklChpArr, autocompleteOptions: this.autoCompleteOptions}] });
    }
  }

  deleteOpnSkl(chip) {
    this.opnSklChpArr = this.opnSklChpArr.filter(item => item != {tag: chip.tag});
  }

  saveOpening(validForm){
    if(!validForm) return false;
    //format data to be stored in database from chips 
    this.opnSklChpArr.forEach(item =>{
      this.newOpening.sklRq.push(item.tag);
    });
    this.rqSklChpArr.forEach(item =>{
      this.newOpening.sklRq.push(item.tag);
    });
    this.companyService.updateOpening(this.companyId, this.newOpening).subscribe(resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      toast('Opening updates successfully', 3000);
    });
  }
  
  publishOpening(openingId){
    this.companyService.publishOpening(this.companyId, openingId).subscribe(resp =>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      toast('Opening published successfully', 3000);
      this.openingDetails = resp.openingsDetails;
    });
  }

  unPublishOpening(openingId){
    this.companyService.unPublishOpening(this.companyId, openingId).subscribe(resp =>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      toast('Opening moved to drafts successfully', 3000);
      this.openingDetails = resp.openingsDetails;
    });
  }

  archiveOpening(openingId){
    this.companyService.archiveOpening(this.companyId, openingId).subscribe(resp =>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      toast('Opening archived successfully', 3000);
      this.openingDetails = resp.openingsDetails;
    });
  }

}
