import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyApiService } from '../../services/companyAPI/company-api.service';
import { toast, MaterializeAction } from 'angular2-materialize';
import { JwtHelper } from 'angular2-jwt';
declare let Materialize:any;

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  rqChipsActions = new EventEmitter<string|MaterializeAction>();
  opnChipsActions = new EventEmitter<string|MaterializeAction>();
  companyId: string;
  jwtHelper: JwtHelper = new JwtHelper();
  decodedToken;
  cmpProfile = {
    name: '',
    est: '',
    address: '',
    abtUs: '',
    logo: {key: '', url: ''},
    website: '',
    openings: [{
      _id: '',           // auto assigned Opening id
      title: '',
      descrip: '',      //  Opening and dept description
      pblshed: false,   // is a published opening
      achivd: false     // is an archived Opening        
    }]
  }
  archivedList = [];
  draftsList = [];
  liveList = [];

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
    let token = localStorage.getItem('authToken');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.companyId = this.route.snapshot.paramMap.get('cmpId');
    this.companyService.getCmpProfile(this.companyId).subscribe(resp=>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      this.cmpProfile = resp.cmpProfile;
      // push openings into appropriate lists
      this.cmpProfile.openings.forEach( opening => {
        opening['routerLink'] = "['opening/"+ opening._id +"']";
        if(opening.achivd) this.archivedList.push(opening);
        else opening.pblshed ? this.liveList.push(opening) : this.draftsList.push(opening);
      });
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

  addOpening(validForm){
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

}
