import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { toast } from 'angular2-materialize';
import { MaterializeAction } from 'angular2-materialize'

@Component({
  selector: 'app-candidate-master-list',
  templateUrl: './candidate-master-list.component.html',
  styleUrls: ['./candidate-master-list.component.css']
})
export class CandidateMasterListComponent implements OnInit {

  yearArr = [];
  candidates = [];
  newSeason: string;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private internshipService : InternshipApiService, private router:Router) { }

  ngOnInit() {
    let currYear = (new Date()).getFullYear();
    let tmpYear = currYear;
    while(tmpYear>= 2018){          //2018 oldest intership in database
      this.yearArr.push(tmpYear);
      tmpYear--;
    }
    this.onYearTabClick(currYear);
  }

  onYearTabClick(year){
    // this.internshipService.getCandidates(year).subscribe(resp => {
    //   if(!resp.success) return toast("Some error occurred, Please try again later.", 3000);
    //   this.candidates = resp.candidates;
    // });
  }

  onIntnshpClick(id){
    this.router.navigate(['/internship/'+id]);
  }

  onSeasonCreateClick(){
    if(this.newSeason == "") return toast("Please fill the season year", 3000);
    this.internshipService.createInternship(this.newSeason).subscribe(resp=>{
      this.modalActions.emit({ action:"modal", params:['close'] });
      if(!resp.success) {
        console.log(resp.error);
        return toast('Some error occurred, please try again later.', 3000);
      }
      toast('new season created successfully', 3000);
    });
  }

}
