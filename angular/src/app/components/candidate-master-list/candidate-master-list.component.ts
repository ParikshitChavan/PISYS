import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ListCandidateService } from '../../services/listCandidate/list-candidate.service';
import { toast } from 'angular2-materialize';
import { MaterializeAction } from 'angular2-materialize'

@Component({
  selector: 'app-candidate-master-list',
  templateUrl: './candidate-master-list.component.html',
  styleUrls: ['./candidate-master-list.component.css']
})
export class CandidateMasterListComponent implements OnInit {

  seasons = [];
  candidates = [];
  newSeason: string;
  dltSeason: string;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private listCandidateService : ListCandidateService, private router:Router) { }

  ngOnInit() {
    this.listCandidateService.getSeasons().subscribe(resp=>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('some error occurred please try later');
      }
      this.seasons = resp.seasons; 
    });
  }

  onYearTabClick(year){
    this.listCandidateService.getCandidates(year).subscribe(resp => {
      if(!resp.success) return toast("Some error occurred, please try again later.", 3000);
      this.candidates = resp.candidates;
    });
  }

  onIntnshpClick(id){
    this.router.navigate(['/internship/'+id]);
  }

  onSeasonCreateClick(){
    if(this.newSeason == "") return toast("Please fill the season year", 3000);
    this.listCandidateService.createSeason(this.newSeason).subscribe(resp=>{
      this.modalActions.emit({ action:"modal", params:['close'] });
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, please try again later.', 3000);
      }
      toast('New season created successfully', 3000);
    });
  }

  deleteSeason(a){
    //first confirf wirh big warning then make them type the year
    if(!this.dltSeason) return toast('Please write the year you want to delete.');
    this.listCandidateService.deleteSeason(a).subscribe(resp=>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, please try again later.', 3000);
      }
      toast('new season deleted successfully', 3000); 
    });
  }

  onAddCandidate(validForm){
    if(!validForm) return false;
    //get candidateId, year
    this.listCandidateService.addCandidate(validForm).subscribe(resp=>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, please try again later.', 3000);
      }
      toast('new season deleted successfully', 3000); 
    });
  }

  removeCandidate(validForm){
    if(!validForm) return false;
    //get candidateId, year
    this.listCandidateService.removeCandidate(validForm).subscribe(resp=>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, please try again later.', 3000);
      }
      toast('new season deleted successfully', 3000); 
    });
  }

  updateCandidate(validForm){
    if(!validForm) return false;
    //get candidateId, year
    this.listCandidateService.updateCandidate(validForm).subscribe(resp=>{
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, please try again later.', 3000);
      }
      toast('new season deleted successfully', 3000); 
    });
  }

}
