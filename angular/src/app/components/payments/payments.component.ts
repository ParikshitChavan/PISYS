import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InternshipApiService } from '../../services/internshipAPI/internship-api.service';
import { toast, MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  modalAction = new EventEmitter<string|MaterializeAction>();
  intnshpId: string;
  isWLMember = false;
  payments: any[];
  upsertPayment :{
    index: number,
    amt: number,
    date: any,
    acptd: boolean
  }= { index:-1, amt: 0, date: '', acptd: false};
  
  constructor(private route:ActivatedRoute , private intnshpService: InternshipApiService) { }

  ngOnInit() {
    this.intnshpService.isWLMember().subscribe(resp=>{
      if(!resp.success) {
        toast('Some error occurred, please try again later', 3000);
        console.log(resp.error);
        return false;
      }
      this.isWLMember = resp.isWLMember;
    });
    this.intnshpId = this.route.snapshot.paramMap.get('id');
    this.intnshpService.loadStipends(this.intnshpId).subscribe(resp=>{
      if(!resp.success){
        toast("Some error occurred, please try again later.", 3000);
        console.log(resp.error);
        return false;
      }
      this.payments = resp.payments;
    });
  }

  editCretePaymentClicked(index){
    if(index!=-1){
      this.upsertPayment.amt = this.payments[index].amt;
      this.upsertPayment.date = this.payments[index].date;
      this.upsertPayment.index = index;
    }
    this.modalAction.emit({action:'modal', params:['open']});
  }

  upsertStipendInfo(isValidForm:boolean){
    if(!isValidForm){
      return false
    }
    this.intnshpService.upsertStipend(this.intnshpId, this.upsertPayment).subscribe(resp => {
      if(!resp.success){
        console.log(resp.error);
        return toast("some error occurred, please try agin later.", 3000);
        this.upsertPayment = { index:-1, amt: 0, date: '', acptd: false};
        return false;
      }
      this.upsertPayment = { index:-1, amt: 0, date: '', acptd: false};
      this.payments = resp.payments;
      toast("Information updated successfully.", 3000);
    });
  }

  deleteStipend(){
    if(confirm("are you sure to want to delete this Stipend data?")){
      this.intnshpService.deleteStipend(this.intnshpId, this.upsertPayment.index).subscribe(resp=>{
        if(!resp.success){
          return toast("Some error occurred please try again later.", 3000);
        }
        this.upsertPayment = { index:-1, amt: 0, date: '', acptd: false};
        this.payments = resp.payments;
        toast("Information deleted successfully.", 3000);
      });
    }
  }
}