import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CvBuilderService } from '../../../services/cvbuilder/cvbuilder.service';
import { toast, MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';
declare let Materialize: any;


@Component({
  selector: 'app-intersts',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();   

  interests = {
    hobbies : '',
    motivation: ''
  };

  interestsValidObject = {
    hobbies : true,
    motivation: true
  }
  canEdit : boolean = true;
  isUserHasCv: boolean = false;
  newInterest : {
    hobbies : string,
    motivation: string
  } = {
    hobbies : '',
    motivation: ''
  }

  constructor(public cvBuilderService: CvBuilderService) { }

  ngOnInit() {
    this.cvBuilderService.isUserHasCv.subscribe(this.setHasCv)
    this.cvBuilderService.personalInterest.subscribe(this.setInterests);
    this.cvBuilderService.accessControl.subscribe(canEdit => this.canEdit = canEdit);
  }

  setHasCv = hasCv => {
    this.isUserHasCv = hasCv;
  }

  setInterests = interests => {
    if(interests){
      this.interests.hobbies =  interests.hobbies ? interests.hobbies : ''
      this.interests.motivation =  interests.motivation ? interests.motivation : ''      
    }
  }
  
  onInputChange(event, field) {
    this.newInterest[field] = event.target.value;
    this.interestsValidObject[field] = true;
  }
  
  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  isInputValid (input: string, minLength, maxLength) {
    return (input && input.trim() && input !== undefined && input.length >= minLength && input.length < maxLength  ) ? true : false;
  }

  isFormValid (interests) {
    let formValid = true;

    if (!this.isInputValid(interests.hobbies, 5, 1000) ) {
      this.interestsValidObject.hobbies = false;
      formValid = false;
    } else {
      this.interestsValidObject.hobbies = true;
    }

    if (!this.isInputValid(interests.motivation, 100, 1000)) {
      this.interestsValidObject.motivation = false;
      formValid = false;
    } else {
      this.interestsValidObject.motivation = true;
    }
    return formValid;
  }

  editInterest () {
    this.newInterest = Object.assign({}, this.interests);
    this.openModal();
    setTimeout(() => {
      Materialize.updateTextFields();
    });
  }

  saveInterest () {
    if(this.isFormValid(this.newInterest)){
      this.cvBuilderService.updateInterest(this.newInterest).then(this.onInterestSubmitSuccess).catch(this.onInterestSubmitFailed);
    }
  }


  onInterestSubmitSuccess = (response) => {
    response.success ? this.cvBuilderService.setPersonalInterest(response.interests) : false;
    toast(response.message, 2000);
    this.closeModal();
  }

  onInterestSubmitFailed = (err) => {
    toast(err, 2000);
  }

}
