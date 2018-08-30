import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }                 from '@angular/router';
import { CvBuilderService } from '../../services/cvbuilder/cvbuilder.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  providers: [ CvBuilderService ] // a service for cv builder to save and share data
})
export class CandidatesComponent implements OnInit {
  candidates : any[] = [];
  candidateName: string = null;
  candidatesPerPage: number = 10;

  pagination : {
    currentPage:  number, totalCandidates: number  } = {
      currentPage:  1, totalCandidates: 0
    }

  constructor(public cvBuilderService:CvBuilderService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.getCandidates();
    this.cvBuilderService.candidateList.subscribe( educations => {
      this.setCandidates(educations);
     });
  }

  setCandidates (candidates) {
    this.candidates = candidates;
  }

  disableNext(){
    return !this.pagination.totalCandidates || ( this.pagination.totalCandidates/this.candidatesPerPage === this.pagination.currentPage )
  }

  nextPage () {
    this.getCandidates ();
  }

  getQuery (name, currentPage) {
    let query = {};
    if(currentPage){
      query = { ...query, pageNumber: currentPage };
    }
    if(name){
      query = { ...query, name: name };
    }
    return query;
  }

  getCandidates  () {
    this.cvBuilderService.pullCandidates(this.getQuery(this.candidateName, this.pagination.currentPage)).then(this.onCandidatePullSuccess).catch(this.onCandidatePullFailed);
  }

  onCandidatePullSuccess = (response) => {
    if(response.success){
      this.cvBuilderService.setCandidateList(response.candidates);
    }
  }

  onCandidatePullFailed  = (err) => {
    toast(err, 2000);
  }

}
