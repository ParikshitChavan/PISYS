import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { AutocompleteApiService } from '../../services/autocompleteAPI/autocomplete-api.service'
import { toast } from 'angular2-materialize';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MaterializeAction } from 'angular2-materialize'

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.css']
})
export class InternshipsComponent implements OnInit {
  yearArr = [];
  internships= [];
  newIntnshp: {
    companyName: string,
    candidateEmail: string
  }={ companyName:'',candidateEmail:'' };
  companyAutocompleteParams = [];
  candidateAutocompleteParams = [];
  companySearchControl : FormControl;
  candidateSearchControl : FormControl;
  companySearchBoxAction =  new EventEmitter<string|MaterializeAction>();
  candidateSearchBoxAction =  new EventEmitter<string|MaterializeAction>();
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private internshipService : InternshipApiService,
    private router:Router,
    private autocompleteService : AutocompleteApiService) { }

  ngOnInit() {
    this.companySearchControl = new FormControl('');
    this.candidateSearchControl = new FormControl('');
    this.companySearchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(term => {
        this.autocompleteService.getCompanySuggestions(term).subscribe(resp=>{
          this.companyAutocompleteParams = [{data: resp.data}];
          setTimeout(()=>{
            this.companySearchBoxAction.emit('autocomplete');
          });          
        });
      });
    this.candidateSearchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(term => {
        this.autocompleteService.getCandidateSuggestions(term).subscribe(resp=>{
          this.candidateAutocompleteParams = [{data: resp.data}];
          setTimeout(()=>{
            this.candidateSearchBoxAction.emit('autocomplete');
          });
        });
      });
    let currYear = (new Date()).getFullYear();
    let tmpYear = currYear;
    while(tmpYear>= 2018){          //2018 oldest intership in database
      this.yearArr.push(tmpYear);
      tmpYear--;
    }
    this.onYearTabClick(currYear);
  }

  onYearTabClick(year){
    this.internshipService.getInternships(year).subscribe(resp => {
      if(!resp.success) return toast("Some error occurred, Please try again later.", 3000);
      this.internships = resp.internships;
    });
  }

  onIntnshpClick(id){
    this.router.navigate(['/internship/'+id]);
  }

  onIntnshpCreateClick(){
    if(this.newIntnshp.companyName =="" || this.newIntnshp.candidateEmail == "") return toast("Please fill in both the candidate and company name", 3000);
    this.internshipService.createInternship(this.newIntnshp).subscribe(resp=>{
      this.modalActions.emit({action:"modal",params:['close']});
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, please try again later.', 3000);
      }
      toast('Intership Created successfully and email sent to companies', 3000);
    });
  }
}
