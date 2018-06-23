import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { toast } from 'angular2-materialize';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/filter';
declare let Materialize:any;

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  decodedToken: any;
  intnshpId: string;
  activatedChild: string = '';
  userAccess: any = 1;
  internship: {
    _id: string,
    projectName: string,
    startDate: any,
    endDate: any,
    description: string,
    designation: string,
    company: {name: string, admins: [string]},
    candidate: {name: string, DP : { key: string, url: string }},
    cmpGivenEmail: string  
  } = { _id:'', projectName: '', startDate: '', endDate: '', description: '', designation: '', company: { name: '', admins: [''] }, candidate: { name: '', DP: {key: '', url: '' }}, cmpGivenEmail: ''};  
  canAccess:boolean = false;
  editingBasicInfo = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private intnshpService: InternshipApiService) {
      this.router.events.filter(evt => evt instanceof NavigationEnd).subscribe((event) => {
        this.activatedChild = this.route.firstChild.routeConfig.path;
      });
      let token = localStorage.getItem('authToken');
      if(token){
        this.decodedToken = this.jwtHelper.decodeToken(token);
        this.userAccess = this.decodedToken.access;
      }
      else router.navigate(['/']);
    }

  ngOnInit() {
    this.intnshpId = this.route.snapshot.paramMap.get('id');
    this.intnshpService.getIntnshipDetails(this.intnshpId).subscribe(resp=>{
      if(!resp.success){
        return toast(resp.error, 3000);
      }
      this.canAccess = true;
      this.internship = resp.internship;
      /*this.internship.startDate = this.formatDate(new Date(resp.internship.startDate));
      this.internship.endDate = this.formatDate(new Date(resp.internship.endDate));*/
      setTimeout(()=>{
        Materialize.updateTextFields();
      });
    });
  }

  /*formatDate(date) {
      let monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "September", "Oct",
        "Nov", "Dec"
      ];
  
      let day = date.getDate();
      let monthIndex = date.getMonth();
      let year = date.getFullYear();
  
      return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }*/

  onBasicInfoSubmit(isValid:boolean){
    if(!isValid) return false;
    this.intnshpService.updateBasicInfo(this.internship).subscribe(resp=>{
      if(!resp.success){
        return toast('Some Error occurred', 3000);
      }
      this.editingBasicInfo = false;
      toast('basic info updated successfully' , 3000);
      setTimeout(()=>{
        Materialize.updateTextFields();
      });
    });
  }
}