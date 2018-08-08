import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyApiService } from '../../../services/companyAPI/company-api.service';
import { toast, MaterializeAction } from '../../../../../node_modules/angular2-materialize';
import { ITSkills } from '../../../helpers/ITSkills.helper';
import { JwtHelper } from '../../../../../node_modules/angular2-jwt';
declare let Materialize:any;

@Component({
  selector: 'app-internship-opening',
  templateUrl: './internship-opening.component.html',
  styleUrls: ['./internship-opening.component.css']
})
export class InternshipOpeningComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  decodedToken: any;
  companyId = '';
  openingId = '';
  rqChipsActions = new EventEmitter<string|MaterializeAction>();
  opnChipsActions = new EventEmitter<string|MaterializeAction>();
  candidateLikesCount = 0;
  editWrites = false;
  openingDetails = {
    _id: '',           // not sending the field in API call would result in failure to update
    title:'',
    sklRq: [],        // Skill required max 5
    sklOp: [],        // optional skills max 5
    descrip: '',      //  Opening and dept description
    rspably: '',      // list of responsibilities
    pblshed: false,   // is a published opening
    achivd: false,     // is an archived Opening
    likes: []       
  };
  likesCount: number;
  isLiked = false;

  allITLang = ITSkills.allITLang;
  allITLangArray = ITSkills.allITLangArray;
  autoCompleteOptions = {
    data: this.allITLang,
    limit: 5,
    minLength: 1
  }
  chipsInit = { autocompleteOptions: this.autoCompleteOptions };
  rqSklChpArr = [];
  opnSklChpArr = [];

  constructor(
    private companyApiService: CompanyApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    let token = localStorage.getItem('authToken');
      if(token){
        this.decodedToken = this.jwtHelper.decodeToken(token);
      }
  }

  ngOnInit() {
    this.companyId = this.route.parent.snapshot.paramMap.get('cmpId');
    this.openingId = this.route.snapshot.paramMap.get('openId');
    this.companyApiService.getOpeningDetails(this.companyId, this.openingId).subscribe(resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      this.openingDetails = resp.openingDetails;
      this.likesCount = this.openingDetails.likes.length;
      if(this.decodedToken.access == 0){
        if(this.openingDetails.likes.includes(this.decodedToken._id)) this.isLiked = true;
      }
      this.editWrites = resp.editWrites;
      this.openingDetails.sklRq.forEach((skill)=>{
        this.rqSklChpArr.push({tag: skill});
      });
      this.openingDetails.sklOp.forEach((skill)=>{
        this.opnSklChpArr.push({tag: skill});
      });
      setTimeout(() => {
        this.rqChipsActions.emit({ action:"material_chip", params:[{data: this.rqSklChpArr, autocompleteOptions: this.autoCompleteOptions}] });
        this.opnChipsActions.emit({ action:"material_chip", params:[{data: this.opnSklChpArr, autocompleteOptions: this.autoCompleteOptions}] });
        setTimeout(()=>{
          Materialize.updateTextFields();
        });
      });
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

  saveOpening(validForm){
    if(!validForm) return false;
    //clean arr and format data to be stored in database from chips
    this.openingDetails.sklRq = [];
    this.rqSklChpArr.forEach(item =>{
      this.openingDetails.sklRq.push(item.tag);
    });
    this.openingDetails.sklOp = [];
    this.opnSklChpArr.forEach(item =>{
      this.openingDetails.sklOp.push(item.tag);
    });
    this.companyApiService.upsertOpening(this.companyId, 'update', this.openingDetails).subscribe(resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      toast('Opening updated successfully', 3000);
    });
  }
  
  publishOpening(){
    if(confirm("are you sure to want to publish this opening?")){
      this.openingDetails.pblshed = true;
      this.companyApiService.upsertOpening(this.companyId, 'update', this.openingDetails).subscribe(resp =>{
        if(!resp.success) {
          console.log(resp.error);
          toast('Some error occurred, Check the console for more details', 3000);
        }
        else toast('Internship opening published successfully', 3000);
        this.router.navigate(['/companyProfile/' + this.companyId+ '/openingsList']);
      });
    }
  }

  moveToDrafts(){
    if(confirm("are you sure to want to move this opening to drafts?")){
      this.openingDetails.pblshed = false;
      this.openingDetails.achivd = false;     //to move out off archived section
      this.companyApiService.upsertOpening(this.companyId, 'update', this.openingDetails).subscribe(resp =>{
        if(!resp.success) {
          console.log(resp.error);
          toast('Some error occurred, Check the console for more details', 3000);
        }
        else toast('Internship opening moved to drafts successfully', 3000);
        this.router.navigate(['/companyProfile/' + this.companyId+ '/openingsList']);
      });
    }
  }

  archiveOpening(){
    if(confirm("are you sure to want to archive this opening?")){
      this.openingDetails.achivd = true;
      this.companyApiService.upsertOpening(this.companyId, 'update', this.openingDetails).subscribe(resp =>{
        if(!resp.success) {
          console.log(resp.error);
          toast('Some error occurred, Check the console for more details', 3000);
        }
        else toast('Internship opening archived successfully', 3000);
        this.router.navigate(['/companyProfile/' + this.companyId+ '/openingsList']);
      });
    }
  }

  likeClicked(){
    if(this.decodedToken.access != 0) return false;
    this.companyApiService.addOpeningLike(this.companyId, this.openingId).subscribe(resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      if(resp.atMaxLimit) {
        return toast('you have already liked 3 openings', 3000);
      }
      this.isLiked = true;
      this.likesCount++;
    });
  }

  unlikeClicked(){
    if(this.decodedToken.access != 0) return false;
    this.companyApiService.removeOpeningLike(this.companyId, this.openingId).subscribe(resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, Check the console for more details', 3000);
      }
      this.isLiked = false;
      this.likesCount--;
    });
  }

}
