import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { toast, MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.css']
})
export class WifiComponent implements OnInit {
  intnshpId: string;
  editingWiFiInfo = false;
  isWLMember = true;
  WiFiInfo:{
    cost: number,
    dId: number,
    agency: {
        name: string,
        email: string,
        phNum: string
    },
    sDate: any,
    rDate: any,
    cmnts: string,
    acptd: boolean
  }= {cost: 0, dId: 0, agency: { name: '', email: '', phNum: '' }, sDate: '', rDate: '', cmnts: '', acptd: true};

  constructor(private route:ActivatedRoute , private intnshpService: InternshipApiService) { }

  ngOnInit() {
    this.intnshpId = this.route.snapshot.paramMap.get('id');
    this.intnshpService.loadWiFiDetails(this.intnshpId).subscribe(resp=>{
      if(!resp.success){
        return toast("Some error occurred, please try again later.");
      }
      if(!resp.wifi.hasOwnProperty('cost')){
        resp.wifi['cost'] = 0;
        resp.wifi['cmnts'] = '';
        this.isWLMember = false;
      }
      this.WiFiInfo = resp.wifi;
    });
  }

  upsertWiFiInfo(isValidForm:boolean){
    if(!isValidForm){
      return false
    }
    this.intnshpService.upsertWiFiDetails(this.intnshpId, this.WiFiInfo).subscribe(resp => {
      if(!resp.success){
        console.log(resp.error);
        return toast("some error occurred, please try agin later.", 3000);
      }
      this.WiFiInfo = resp.wifi;
      this.editingWiFiInfo = false;
      toast("Information updated successfully.", 3000);
    });
  }  
}
