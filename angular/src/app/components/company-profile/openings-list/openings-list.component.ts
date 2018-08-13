import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyApiService } from '../../../services/companyAPI/company-api.service';
import { toast, MaterializeAction } from 'angular2-materialize';
import { ITSkills } from '../../../helpers/ITSkills.helper';
declare let Materialize:any;

@Component({
  selector: 'app-openings-list',
  templateUrl: './openings-list.component.html',
  styleUrls: ['./openings-list.component.css']
})
export class OpeningsListComponent implements OnInit {
  rqChipsActions = new EventEmitter<string|MaterializeAction>();
  opnChipsActions = new EventEmitter<string|MaterializeAction>();
  
  editWrites = false;
  decodedToken = {};
  companyId = '';
  openings: [{
    _id: '',           // auto assigned Opening id
    title: '',
    descrip: '',      //  Opening and dept description
    pblshed: false,   // is a published opening
    achivd: false     // is an archived Opening        
  }]
  archivedList = [];
  draftsList = [];
  liveList = [];

  allITLang = ITSkills.allITLang;
  allITLangArray = ITSkills.allITLangArray;
  autoCompleteOptions = {
    data: this.allITLang,
    limit: 5,
    minLength: 1
  }
  chipsInit = { autocompleteOptions: this.autoCompleteOptions };
  newOpening = { title: '', descrip:'', rspably:'', sklRq:[], sklOp:[] };
  rqSklChpArr = [];
  opnSklChpArr = [];

  constructor(
    private companyService: CompanyApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.companyId = this.route.parent.snapshot.paramMap.get('cmpId');
    this.companyService.getInternshipOpenings(this.companyId).subscribe(resp=>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      this.openings = resp.openings;
      this.editWrites = resp.editWrites;
      // push openings into appropriate lists
      this.openings.forEach( opening => {
        if(opening.achivd) this.archivedList.push(opening);
        else opening.pblshed ? this.liveList.push(opening) : this.draftsList.push(opening);
      });
    });
  }
  
  openingClicked(openingId){
    const link = 'companyProfile/' + this.companyId + '/opening/'+ openingId;
    this.router.navigate([link]);
  }

  saveOpening(validForm){
    if(!validForm) return false;
    //clean arr and format data to be stored in database from chips
    this.newOpening.sklRq = [];
    this.rqSklChpArr.forEach(item =>{
      this.newOpening.sklRq.push(item.tag);
    });
    this.newOpening.sklOp = [];
    this.opnSklChpArr.forEach(item =>{
      this.newOpening.sklOp.push(item.tag);
    });
    this.companyService.upsertOpening(this.companyId, 'insert', this.newOpening).subscribe(resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      toast('Opening created successfully', 3000);
      //route to new opening
      this.newOpening = { title: '', descrip:'', rspably:'', sklRq:[], sklOp:[] };
    });
  }

  addRqSkl(chip) {
    if(this.allITLangArray.includes(chip.tag) && this.rqSklChpArr.length < 5){
      this.rqSklChpArr.push({tag: chip.tag});
    }
    else{
      this.rqChipsActions.emit({ action:"material_chip", params:[{data: this.rqSklChpArr, autocompleteOptions: this.autoCompleteOptions}] });
    }    
  }

  deleteRqSkl(chip) {
    this.rqSklChpArr = this.rqSklChpArr.filter(item => item.tag != chip.tag);
  }

  addOpnSkl(chip) {
    if(this.allITLangArray.includes(chip.tag) && this.opnSklChpArr.length < 5){
      this.opnSklChpArr.push({tag: chip.tag});
    }
    else{
      this.opnChipsActions.emit({ action:"material_chip", params:[{data: this.opnSklChpArr, autocompleteOptions: this.autoCompleteOptions}] });
    }
  }

  deleteOpnSkl(chip) {
    this.opnSklChpArr = this.opnSklChpArr.filter(item => item.tag != chip.tag);
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
    this.companyService.upsertOpening(this.companyId, 'insert', this.newOpening).subscribe(resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      toast('Opening updates successfully', 3000);
    });
  }
}
