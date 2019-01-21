import { Component, OnInit, EventEmitter } from '@angular/core';
import { CvBuilderService } from '../../services/cvbuilder/cvbuilder.service';
import { AuthService } from '../../services/auth/auth.service';
import { toast, MaterializeAction } from 'angular2-materialize';
import { CompanyApiService } from '../../services/companyAPI/company-api.service'

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  providers: [ CvBuilderService ] // a service for cv builder to save and share data
})
export class CandidatesComponent implements OnInit {
  candidates : any[] = [];
  candidateEmail: string = '';
  candidatesPerPage: number = 10;
  deletinCandi = {
    _id: '',
    email: ''
  };
  cnfEmailVal = '';
  delModalActions = new EventEmitter<string|MaterializeAction>();
  bufferedCandidates: any[] = [];
  // pager object
  pager: any = {
    currentPage  : 1
  };
  totalCandidatesCount : 0;
  // paged candidates
  pagedCandidates: any[] = [];
  nextPage = 1;
  bufferedPage = 0;
  loading = true;
  myCmp = {
    _id: '',
    name: '',
    shrtlstd: [],
    cntacd: []
  };

  constructor(
    public cvBuilderService:CvBuilderService,
    private authService: AuthService,
    private companyService: CompanyApiService ) { }

  ngOnInit() {
    this.myCmp = JSON.parse(localStorage.getItem('user')).company;
    this.getCandidates();
    this.cvBuilderService.candidateList.subscribe( candidates => {
      this.setCandidates(candidates);
    });
  }

  setCandidates = (candidates) => {
    this.bufferedCandidates.push(...candidates);
    this.setPage(this.nextPage);
  }

  getQuery (email: string, currentPage: number) {
    let query = {};
    if(currentPage){
      query = { ...query, pageNumber: currentPage};
    }
    if(email && email.trim().length){
      query = { ...query, email: email };
    }
    return query;
  }

  clearSearch () {
    this.resetPagination();
    this.candidateEmail = '';
    this.getCandidates();
  }

  resetPagination () {
    this.pager.currentPage  = 1
    this.totalCandidatesCount = 0;
    this.pagedCandidates = [];
    this.nextPage = 1;
    this.bufferedPage = 0;
    this.bufferedCandidates = [];
  }

  searchCandidates () {
    this.resetPagination();
    this.getCandidates();
  }

  getCandidates  () {
    this.loading = true;
    this.cvBuilderService.pullCandidates(this.getQuery(this.candidateEmail, ++this.bufferedPage )).then(this.onCandidatePullSuccess).catch(this.onCandidatePullFailed);
  }

  onCandidatePullSuccess = (response) => {
    if(response.success){
      if(response.count){
         this.totalCandidatesCount = response.count;
      }
      this.cvBuilderService.setCandidateList(response.candidates);
      //this.shortlistedCandi = response.shortlistedCandidates;
    }
    this.loading = false;
  }

  onCandidatePullFailed  = (err) => {
    this.loading = false;
    toast(err, 2000);
  }


  setPage(page: number) {
    if(this.pager.totalPages && page > this.pager.totalPages){
      return
    }
    if (this.bufferedCandidates.length > 0 && page > ( Math.ceil(this.bufferedCandidates.length / 10) )) {
      this.loading = true;
      this.getCandidates();
      this.nextPage = page; 
    }else{
      // get current page of candidates
      this.pager = this.getPager(this.totalCandidatesCount, page);
      this.pagedCandidates = this.bufferedCandidates.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  }

  getPager(totalCandidates: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalCandidates / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages to show current line at center
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalCandidates - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {  totalCandidates, currentPage, pageSize, totalPages, startPage, endPage, startIndex, endIndex, pages  };
  }

  onCnfDelEmail(form){
    if(!form.valid) return toast('Please type in the correct email address.', 4000);
    if(form.controls.cnfEmail.value == this.deletinCandi.email){
      this.authService.deleteUser(this.deletinCandi._id).subscribe(resp =>{
        if(!resp.success) return toast(resp.message, 4000);
        this.delModalActions.emit({action:"modal", params:['close']});
        toast('candidate deleted successfully.', 4000);
        this.clearSearch();
      });
    }
    else return toast('Please type in the correct email address.', 4000);
  }
  
  shortlistClicked(candidateId){
    this.companyService.addShortlisted(this.myCmp._id, candidateId).subscribe( resp =>{
      if(!resp.success){
        console.log(resp.error);
        return toast('some error occurred, please check the console for more details.', 3000);
      }
      let userData = JSON.parse(localStorage.getItem('user'));
      userData.company.shrtlstd.push(candidateId);
      this.authService.saveHeaderUserInfo(userData);
      this.myCmp = userData.company.shrtlstd;
      toast('User shortlisted successfully', 3000);
    });
  }
}
