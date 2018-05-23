import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { toast, MaterializeAction } from 'angular2-materialize';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-weekly-reports',
  templateUrl: './weekly-reports.component.html',
  styleUrls: ['./weekly-reports.component.css']
})
export class WeeklyReportsComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  decodedToken: any;
  modalReptActions = new EventEmitter<string|MaterializeAction>();
  modalCmtActions = new EventEmitter<string|MaterializeAction>();
  wReports : any[];
  intnshpId: any;
  viewingRept: number;
  upsertWrept :{
    rept: string;
    week: {sdate: any, edate: any}
    index: number
  } = {rept:"", week:{sdate:'', edate:''}, index:-1};       // -1 for new/create
  upsertCmt:{
    body: string,
    index: number
  } = {body:'', index:-1};            // -1 for new/create
  newCmt:string='';

  constructor(private route: ActivatedRoute, private intnshpService: InternshipApiService) { }

  ngOnInit() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.intnshpId = this.route.snapshot.paramMap.get('id');
    this.intnshpService.loadWeeklyReports(this.intnshpId).subscribe(reports=>{
      this.wReports = reports;
    });
  }

  onWeekClick(index:number){
    this.viewingRept = index
  }

  editCreateCommentCLick(index:number){
    if(index!=-1){    //not new but edit
      this.upsertCmt.body= this.wReports[this.viewingRept].cmnts[index].body;
      this.upsertCmt.index =index 
    }
    this.modalCmtActions.emit({action:'modal', params:['open']})
  }

  editCreateReptClick(index:number){
    if(index!=-1){    //not new but edit
      this.upsertWrept.rept= this.wReports[this.viewingRept].rept;
      this.upsertWrept.week=  this.wReports[this.viewingRept].week;
      this.upsertWrept.index = this.viewingRept;
    }
    this.modalReptActions.emit({action:'modal', params:['open']})
  }

  upsertWeeklyReport(isValidForm: boolean){
    if(!isValidForm) return false;
    this.intnshpService.upsertWeeklyReport(this.intnshpId, this.upsertWrept).subscribe(resp=>{
      if(!resp.success){
        toast('Some error occurred');
        console.log(resp.error);
        return false;
      }
      if(this.upsertWrept.index == -1) this.viewingRept++;
      this.wReports = resp.wReports;
      this.upsertWrept = {rept:"", week:{sdate:'', edate:''}, index:-1};
      toast('Report updated successfully.', 3000);
    });
  }
  
  upsertComment(isValidForm: boolean){
    if(!isValidForm) return false;
    this.intnshpService.upsertComment(this.intnshpId, this.viewingRept, this.upsertCmt).subscribe(resp=>{
      if(!resp.success){
        toast('Some error occurred');
        console.log(resp.error);
        return false;
      }
      this.wReports = resp.wReports;
      this.upsertCmt = {body:'', index:-1};
      toast('comment updated successfully.', 3000);
    });
  }

  deleteComment(index:number){
    this.intnshpService.deleteComment(this.intnshpId, this.viewingRept, index).subscribe(resp=>{
      if(!resp.success){
        toast('Some error occurred');
        console.log(resp.error);
        return false;
      }
      this.wReports = resp.wReports;
      this.upsertCmt = {body:'', index:-1};
      toast('comment deleted successfully.', 3000);
    });
  }
}
