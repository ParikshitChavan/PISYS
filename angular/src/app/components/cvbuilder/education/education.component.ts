import { Component, OnInit } from '@angular/core';
import { Education } from '../../../model/education';
import { ActivatedRoute, Params }                 from '@angular/router';

import { toast, MaterializeAction} from 'angular2-materialize';
import { EventEmitter } from '@angular/core';

import * as moment from 'moment';
import { CvBuilderService } from '../../../services/cvbuilder/cvbuilder.service';
declare let Materialize:any;


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();

  educations : Education[] = [] ;
  newEducation: Education;
  selectedEducationIndex: boolean= false;
  isValidCurrentEducation;
  currentRecordID;
  canEdit: boolean = false;

  loading : boolean = true;
  invalidFromDateMsg: string = 'Please input start date.'
  inValidDateMsg: string = 'Please input end date.'
  modalPurpose : string = 'add'; // add - adding a new entry, edit - editing new entry. delete - confirmation message
  isUserHasCv: boolean = false;

  isRecentEducationfound : boolean = false;;

  constructor(public cvBuilderService:CvBuilderService,
    private route:ActivatedRoute
  ) { }

  /**
   *
   *
   * @memberof EducationComponent
   */
  ngOnInit() {
    this.cvBuilderService.isUserHasCv.subscribe(this.setHasCv)
    this.cvBuilderService.educations.subscribe( educations => {
      this.setEducations(educations);
      // this.findRecentEducation(educations);
     });
    this.cvBuilderService.accessControl.subscribe(canEdit => this.canEdit = canEdit);
    this.setNewEducation(this.getDummyEducation());
    this.setValidationObject();
  }

  setHasCv = hasCv => {
    this.isUserHasCv = hasCv;
  }
  /**
   * @memberof EducationComponent
   */
  setEducations (educations) {
    this.educations = educations;
  }


  // findRecentEducation (educations) {
  //   if(educations instanceof Array){
  //     this.isRecentEducationfound = educations.find( education => education.isLatest );
  //   }
  // }

  /**
   * @memberof EducationComponent
   */
  createEducation (){
    this.modalPurpose = 'add';
    this.setNewEducation(this.getDummyEducation());
    this.setValidationObject();
    this.openModal();
  }

  /**
   * @param {Education} education
   * @memberof EducationComponent
   */
  openEditEducation(education: Education) {
    this.modalPurpose = 'edit';
    this.setValidationObject();
    this.setNewEducation(education);
    this.openModal();
    setTimeout(()=>{
      Materialize.updateTextFields();
    });
  }
  

  /**
   * @param {*} educationId
   * @memberof EducationComponent
   */
  showDeleteConfirmDialigue (educationId) {
    this.currentRecordID = educationId
    this.modalPurpose = 'delete';
    setTimeout(() => {
      this.openModal();
    });
  }

  openModal(){
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal(){
    this.modalPurpose = 'add';
    this.modalActions.emit({action:"modal",params:['close']});
  }

  /**
   * @param {Education} education
   * @memberof EducationComponent
   */
  setNewEducation (education: Education) {
    this.newEducation =  Object.assign({}, education)
    // convert dates in readable format
    if(education.startDate){
      this.newEducation.startDate = moment(this.newEducation.startDate).format('ll'); 
    }
    if(education.endDate){
      this.newEducation.endDate = moment(this.newEducation.endDate).format('ll');
    }
  }

  /**
   * @memberof EducationComponent
   */
  setValidationObject () {
    this.isValidCurrentEducation = { 
      schoolName : true,
      fieldOfStudy: true,
      grade: true,
      startDate: true,
      endDate: true
    }
  }


  /**
   * @param {Education[]} educations
   * @param {*} recordId
   * @returns
   * @memberof EducationComponent
   */
  getEducationToSow(educations: Education[],recordId) {
    return educations.find(record => record._id == recordId);
  }

  /**
   * @returns
   * @memberof EducationComponent
   */
  getDummyEducation(){
    return { _id: '', schoolName: '',  fieldOfStudy: '', grade: '', startDate: null,  endDate: null, isLatest: false };
  }

  onInputChange(event, field){
    this.newEducation[field] = event.target.value;
    this.isValidCurrentEducation[field] = true;
  }

  setLatest(isLatest) {
    this.newEducation.isLatest = isLatest;
  }

  isLatestEduExists(educations: Education[]){
    return educations.some((education) => {
      return education.isLatest === true;
    })
  }

  submitEducation () {
   if (this.isFormValid(this.newEducation)) {
     switch (this.modalPurpose) {
      case 'add':
         let isLatest =this.isLatestEduExists(this.educations);
         if(!isLatest){
          this.setLatest(true);
        }
         this.addEducation();
         break;
      case 'edit':
         this.updateEducation() 
         break;
     }
    }
  }
  
  addEducation () {
    this.cvBuilderService.addEducation(this.newEducation).then(this.onEducationSubmitSuccess).catch(this.onEducationSubmitFailed);
  }

  updateEducation (){
    this.cvBuilderService.updateEducation(this.newEducation).then(this.onEducationSubmitSuccess).catch(this.onEducationSubmitFailed);
  }

  deleteEducation () {
      this.cvBuilderService.deleteEducation(this.currentRecordID).then(this.onEducationDeleteSuccess).catch(this.onEducationSubmitFailed);
  }

  onEducationSubmitSuccess = (response) => {
    response.success ? this.cvBuilderService.setEducations(response.educations) : false;
    toast(response.message, 2000);
    this.closeModal();
  }

  onEducationDeleteSuccess = (response) => {
    this.closeModal();
    toast(response.message, 2000);
    if(response.success){
      this.cvBuilderService.setEducations(response.educations);
      this.selectedEducationIndex = false;
      this.currentRecordID = null;
    }
  }

  onEducationSubmitFailed = (err) => {
    toast(err, 2000);
  }

  isInputValid (input: string){
    return (input && input.trim() && input !== undefined) ? true : false;
  }

  isFormValid (education: Education) {
    let formValid = true;

    if (!this.isInputValid(education.schoolName)){
      this.isValidCurrentEducation.schoolName = false;
      formValid = false;
    }else{
      this.isValidCurrentEducation.schoolName = true;
    }

    if (!this.isInputValid(education.fieldOfStudy)){
      this.isValidCurrentEducation.fieldOfStudy = false;
      formValid = false;
    }else{
      this.isValidCurrentEducation.fieldOfStudy = true;
    }

    if (!this.isInputValid(education.grade)){
      this.isValidCurrentEducation.grade = false;
      formValid = false;
    }else{
      this.isValidCurrentEducation.grade = true;
    }

    if(!moment(education.startDate).isValid() ){
      this.isValidCurrentEducation.startDate = false;
      formValid = false;
      this.invalidFromDateMsg = 'Please input start date.'
    }else{

      if(moment(education.startDate).isAfter(moment())){
        this.invalidFromDateMsg = 'Start date should not be greater than todays date.'
        this.isValidCurrentEducation.startDate = false;
        formValid = false;
      } else {
        this.isValidCurrentEducation.startDate = true;
      }
    }

    if(!moment(education.endDate).isValid()){
      this.isValidCurrentEducation.endDate = false;
      formValid = false;
      this.inValidDateMsg = 'Please input end date.';
    }else{
      this.isValidCurrentEducation.endDate = true;
      const endDate = moment(education.endDate);
      const startDate = moment(education.startDate);
      if(endDate.diff(startDate, 'years') < 1) {
        formValid = false;
        this.isValidCurrentEducation.endDate = false;
        this.inValidDateMsg = 'Start date should be smaller than end date by 1 year.';
      }     
    }

    return formValid;

  }
}
