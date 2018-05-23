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
  yearArr : number[];
  internships: any[];
  newIntnshp: {
    companyName: string,
    candidateName: string
  }={ companyName:'',candidateName:'' };
  companyAutocompleteData={};
  candidateAutocompleteData={};
  companySearchControl : FormControl;
  candidateSearchControl : FormControl;
  companySearchBoxAction =  new EventEmitter<string|MaterializeAction>();
  candidateSearchBoxAction =  new EventEmitter<string|MaterializeAction>();

  constructor(private internshipService : InternshipApiService,
    private router:Router,
    private autocompleteService : AutocompleteApiService) { }

  ngOnInit() {
    this.companySearchControl = new FormControl('');
    this.candidateSearchControl = new FormControl('');
    this.companySearchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(term => {
        this.autocompleteService.getCompanySuggestions(term).subscribe(data=>{
          this.companyAutocompleteData = [{data:data}];
          setTimeout(()=>{
            this.companySearchBoxAction.emit('autocomplete');
          });          
        });
      });
    this.candidateSearchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(term => {
        this.autocompleteService.getCandidateSuggestions(term).subscribe(data=>{
          this.candidateAutocompleteData = [{data:data}];
          setTimeout(()=>{
            this.candidateSearchBoxAction.emit('autocomplete');
          });
        });
      });
    let currYear = (new Date()).getFullYear();
    let tmpYear = currYear;
    while(tmpYear>=2018){          //2018 oldest intership in database
      this.yearArr.push(tmpYear);
      tmpYear--;
    }
    this.onYearTabClick(currYear);
  }

  onYearTabClick(year){
    this.internshipService.getInternships(year).subscribe(internships => {
      this.internships = internships;
    });
  }

  onIntnshpClick(index){
    this.router.navigate(['/internship/'+this.internships[index]._id]);
  }

  onIntnshpCreateClick(isValidForm){
    if(!isValidForm) return false;
    this.internshipService.createInternship(this.newIntnshp).subscribe(response=>{
      if(!response.success) console.log(response.error);
      toast('Intership Created successfully and email sent to companies', 3000);
    });
  }
}
