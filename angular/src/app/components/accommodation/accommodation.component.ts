import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { toast, MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {
  intnshpId: string;
  editingAcmdationInfo = false;
  isWLMember: boolean = true;
  acmdationInfo:{
    cost: number,
    address: string,
    agency: {
        name: string,
        email: string,
        phNum: string
    },
    mIn: any,
    mOut: any,
    cmnts: string
  }= {cost: 0, address: '', agency: { name: '', email: '', phNum: '' }, mIn: '', mOut: '', cmnts: ''};

  constructor(private route:ActivatedRoute , private intnshpService: InternshipApiService) { }

  ngOnInit() {
    this.intnshpId = this.route.snapshot.paramMap.get('id');
    this.intnshpService.loadAccommodationDetails(this.intnshpId).subscribe(resp=>{
      if(!resp.success){
        toast("Some error occurred, please try again later.");
      }
      if(!resp.accommodation.hasOwnProperty('cost')){
        resp.accommodation['cost'] = 0 ;
        resp.accommodation['cmnts'] = '';
        this.isWLMember = false;
      }
      this.acmdationInfo = resp.accommodation;
    });
  }

  upsertWiFiInfo(isValidForm:boolean){
    if(!isValidForm){
      return false
    }
    this.intnshpService.upsertAccommodationDetails(this.intnshpId, this.acmdationInfo).subscribe(resp => {
      if(!resp.success){
        console.log(resp.error);
        return toast("some error occurred, please try agin later.", 3000);
      }
      this.acmdationInfo = resp.accommodation;
      this.editingAcmdationInfo = false;
      toast("Information updated successfully.", 3000);
    });
  }  
}