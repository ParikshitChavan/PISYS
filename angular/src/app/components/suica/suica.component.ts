import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { toast, MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-suica',
  templateUrl: './suica.component.html',
  styleUrls: ['./suica.component.css']
})
export class SuicaComponent implements OnInit {
  intnshpId: string;
  editingSuicaInfo = false;
  isWLMember = true;
  suicaInfo:{
    cardNo: number,
    line: string,
    from: string,
    to: string,
    name: string,
    issued: any,
    expiry: any,
    acptd: boolean,
    cmnts: string
  }= { cardNo: 0, line: '', from: '', to: '', name: '', issued: '', expiry: '', acptd: true, cmnts:'' };

  constructor(private route:ActivatedRoute , private intnshpService: InternshipApiService) { }

  ngOnInit() {
    this.intnshpId = this.route.snapshot.paramMap.get('id');
    this.intnshpService.loadSuicaDetails(this.intnshpId).subscribe(resp=>{
      if(!resp.success){
        toast('Some error occurred, please try again later.');
        return false;
      }
      if(!resp.suica.hasOwnProperty('cmnts')){
        resp.suica['cmnts'] = '';
        this.isWLMember = false;
      }
      this.suicaInfo = resp.suica;
    });
  }

  upsertSuicaInfo(isValidForm:boolean){
    if(!isValidForm){
      return false
    }
    this.intnshpService.upsertSuicaDetails(this.intnshpId, this.suicaInfo).subscribe(resp => {
      if(!resp.success){
        console.log(resp.error);
        return toast("some error occurred, please try agin later.", 3000);
      }
      this.suicaInfo = resp.suica;
      this.editingSuicaInfo = false;
      toast("Information updated successfully.",3000)
    });
  }
}
