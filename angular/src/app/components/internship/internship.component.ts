import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {
  intnshpId: string;
  internship: any;
  canAccess:boolean = false;
  editingBasicInfo = false;

  constructor(private route:ActivatedRoute, private intnshpService:InternshipApiService) { }

  ngOnInit() {
    this.intnshpId = this.route.snapshot.paramMap.get('id');
    this.intnshpService.getIntnshipDetails(this.intnshpId).subscribe(resp=>{
      if(!resp.success){
        return toast(resp.error, 3000);
      }
      this.canAccess = true;
      this.internship = resp.intnshpData;
    });
  }

  onBasicInfoSubmit(isValid:boolean){
    if(!isValid) return false;
    this.intnshpService.updateBasicInfo(this.internship).subscribe(resp=>{
      if(!resp.success){
        return toast(resp.error, 3000);
      }
      this.editingBasicInfo = false;
      toast(resp.msg , 3000);
    });
  }
}
