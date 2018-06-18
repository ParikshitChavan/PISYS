import { Component, OnInit } from '@angular/core';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { toast } from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  internships = [];

  constructor(private internshipService: InternshipApiService, private router: Router) { }

  ngOnInit() {
    this.internshipService.getDashboardInternships().subscribe(resp=>{
      if(!resp.success){
        console.log(resp);
        return toast('some Error occurred, please try again later.');
      }
      this.internships = resp.internships;
    });
   }

   onInternshipClick(id){
    this.router.navigate(['/internship/'+id]);
  }

}
