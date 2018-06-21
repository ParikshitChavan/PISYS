import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { toast, MaterializeAction } from 'angular2-materialize';
import  { JwtHelper } from 'angular2-jwt'

declare let Materialize:any;

@Component({
  selector: 'app-weekly-reports',
  templateUrl: './weekly-reports.component.html',
  styleUrls: ['./weekly-reports.component.css']
})
export class WeeklyReportsComponent implements OnInit {
  @ViewChild('submitReptBtn') upsertReptSubmitBtn: ElementRef;
  @ViewChild('WreptImg') WreptImg:ElementRef;
  jwtHelper: JwtHelper = new JwtHelper();
  decodedToken: any;
  modalReptActions = new EventEmitter<string|MaterializeAction>();
  modalCmtActions = new EventEmitter<string|MaterializeAction>();
  wReports = [];
  intnshpId: any;
  viewingRept: number = -1;
  upsertWrept : {
    rept: any,
    week: {sDate: any, eDate: any},
    index: any
  } = {rept: {
    difficulty: 0,
    learnt: '',
    tech: '',
    supQuery: '',
    interesting: '',
    other: ''
  }, week: {sDate:'', eDate:''}, index: -1};       // -1 for new/create
  upsertCmt:{
    body: string,
    index: number
  } = {body:'', index:-1};            // -1 for new/create
  newCmt:string ='';
  isWLMember: boolean = false;
  upsertFileName: string;
  
  constructor(private route: ActivatedRoute, private intnshpService: InternshipApiService) {
    let token = localStorage.getItem('authToken');
    this.decodedToken = this.jwtHelper.decodeToken(token);
   }

  ngOnInit() {
    this.intnshpService.isWLMember().subscribe(resp=>{
      if(!resp.success) {
        toast('Some error occurred, please try again later', 3000);
        console.log(resp.error);
        return false;
      }
      this.isWLMember = resp.isWLMember;
    });
    this.intnshpId = this.route.parent.snapshot.paramMap.get('id');
    this.intnshpService.loadWeeklyReports(this.intnshpId).subscribe(resp=>{
      if(!resp.success){
        toast('Some error occurred');
        console.log(resp.error);
        return false;
      }
      this.wReports = resp.weeklyReports;
    });
  }

  onWeekClick(index:number){
    this.viewingRept = index;
    return false;
  }

  editCreateReptClick(index:number){
    if(index!=-1){    //not new but edit
      this.upsertWrept.rept= this.wReports[this.viewingRept].rept;
      this.upsertWrept.week=  this.wReports[this.viewingRept].week;
      this.upsertWrept.index = this.viewingRept;
    }
    else{
      this.upsertWrept = {rept: {
        difficulty: 0,
        learnt: '',
        tech: '',
        supQuery: '',
        interesting: '',
        other: ''
      }, week: {sDate:'', eDate:''}, index: -1};
    }
    this.modalReptActions.emit({action:'modal', params:['open']});
    setTimeout(()=>{
      Materialize.updateTextFields();
    });
  }

  invokeReptFrmSubmit(){
    this.upsertReptSubmitBtn.nativeElement.click();
  }

  upsertWeeklyReport(formData){
    let fileInp = this.WreptImg.nativeElement;
    if(this.upsertWrept.rept.difficulty == 0) formData.form.controls['difficulty'].setErrors({'incorrect': true});
    if(!fileInp.files || !fileInp.files[0]) formData.form.controls['upsertFileName'].setErrors({'incorrect': true});
    else if(!(/\.(jpg|jpeg|png)$/i).test(fileInp.files[0].name)) formData.form.controls['upsertFileName'].setErrors({'incorrect': true});
        else formData.form.controls['upsertFileName'].setErrors(null);
    if(!formData.valid) return false;
    let completeFormData = new FormData();
    completeFormData.append('reptIndex', this.upsertWrept.index);
    completeFormData.append('sDate', this.upsertWrept.week.sDate);
    completeFormData.append('eDate', this.upsertWrept.week.eDate);
    completeFormData.append('difficulty', this.upsertWrept.rept.difficulty);
    completeFormData.append('learnt', this.upsertWrept.rept.learnt);
    completeFormData.append('tech', this.upsertWrept.rept.tech);
    completeFormData.append('supQuery', this.upsertWrept.rept.supQuery);
    completeFormData.append('interesting', this.upsertWrept.rept.interesting);
    completeFormData.append('other', this.upsertWrept.rept.other);
    completeFormData.append('weekSnapshot', fileInp.files[0], fileInp.files[0].name);

    this.intnshpService.upsertWeeklyReport(this.intnshpId ,completeFormData).subscribe(resp=>{
      if(!resp.success){
        toast('Some error occurred');
        console.log(resp.error);
        return false;
      }
      if(this.upsertWrept.index == -1) this.viewingRept++;
      this.wReports = resp.weeklyReports;
      this.modalReptActions.emit({action:'modal', params:['close']});
      this.upsertWrept = {rept: { difficulty: 0, learnt: '', tech: '', supQuery: '', interesting: '', other: ''}, week: {sDate:'', eDate:''}, index: -1};
      formData.form.resetForm();      
      toast('Report updated successfully.', 3000);
    });
  }
  
  createCommentSubmit(isValidForm: boolean){
    if(!isValidForm) return false;
    let comment = { body: this.newCmt, index:-1 };
    console.log(this.viewingRept);
    this.intnshpService.upsertComment(this.intnshpId, this.viewingRept, comment).subscribe(resp=>{
      if(!resp.success){
        toast('Some error occurred');
        console.log(resp.error);
        return false;
      }
      this.wReports[this.viewingRept].cmnts = resp.comments;
      this.newCmt = '';
      toast('comment added successfully.', 3000);
    })
  }

  editComment(index){
    this.upsertCmt.body= this.wReports[this.viewingRept].cmnts[index].body;
    this.upsertCmt.index = index;
    this.modalCmtActions.emit({action:'modal', params:['open']});
  }

  updateCommentSubmit(isValidForm: boolean){
    if(!isValidForm) return false;
    this.intnshpService.upsertComment(this.intnshpId, this.viewingRept, this.upsertCmt).subscribe(resp=>{
      if(!resp.success){
        toast('Some error occurred');
        console.log(resp.error);
        return false;
      }
      this.wReports[this.viewingRept].cmnts = resp.comments;
      this.upsertCmt = {body:'', index:-1};
      toast('comment updated successfully.', 3000);
    });
  }
  
  deleteComment(index:number){
    if(confirm("are you sure to want to delete this comment?")){
      this.intnshpService.deleteComment(this.intnshpId, this.viewingRept, index).subscribe(resp=>{
        if(!resp.success){
          toast('Some error occurred');
          console.log(resp.error);
          return false;
        }
        this.wReports[this.viewingRept].cmnts = resp.comments;
        toast('comment deleted successfully.', 3000);
      });
    }
  }
}
