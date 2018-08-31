import { Component, OnInit } from '@angular/core';

import { CvBuilderService } from '../../../services/cvbuilder/cvbuilder.service';
import { toast } from 'angular2-materialize';

declare let Materialize:any;

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css']
})
export class RemarksComponent implements OnInit {

  editing : boolean = false;
  remarks : string = '';
  newRemark: string = ''
  isUserHasCv: boolean = false;
  constructor(public cvBuilderService: CvBuilderService) { }

  ngOnInit() {
    this.cvBuilderService.isUserHasCv.subscribe(this.setHasCv)
    this.cvBuilderService.remarks.subscribe(this.setRemarks);
  }

  setHasCv = hasCv => {
    this.isUserHasCv = hasCv;
  }

  setRemarks = remarks => {
    this.remarks =  remarks ? remarks : '';
  }

  toggleRemarksEdit(edit){
    this.editing = edit;
    this.newRemark = this.remarks;;
    this.updateTextFields()
  }

  updateTextFields () {
    setTimeout(()=> Materialize.updateTextFields(),0);
  }

  
  isInputValid (input: string) {
    return (input && input.trim() && input !== undefined && input.length >= 10 && input.length < 1000  ) ? true : false;
  }

  saveRemarks(){
      this.cvBuilderService.updateRemarks(this.newRemark).then(this.onRemarkSubmitSuccess).catch(this.onRemarkSubmitFailed);
  }


  onRemarkSubmitSuccess = (response) => {
    response.success ? this.cvBuilderService.setRemarks(response.remarks) : false;
    toast(response.message, 2000);
    this.toggleRemarksEdit(false);
  }

  onRemarkSubmitFailed = (err) => {
    toast(err, 2000);
    this.toggleRemarksEdit(false);
  }

}
