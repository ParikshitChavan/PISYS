import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { toast, MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';

import * as moment from 'moment';
import { CvBuilderService } from '../../../services/cvbuilder/cvbuilder.service';
import { Experience } from '../../../model/experience';

import { ITSkills } from '../../../helpers/ITSkills.helper';


declare let Materialize: any;

/**
 *
 *
 * @export
 * @class ExperienceComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {


  modalActions = new EventEmitter<string | MaterializeAction>();   
  rqChipsActions = new EventEmitter<string|MaterializeAction>(); // stores events for chips

  experiences: Experience[] = [];  // stores all experience if user
  newExperience: Experience;       // experience being created or edit
  isValidCurrentExperience;         // object to store validation flag for forms
  currentRecordID;                  //object id being deleted
  canEdit: boolean = false;         // access control to allow or disallow user from adding/ deleting records

  invalidFromDateMsg: string  = 'Please input start date.'
  inValidDateMsg: string = 'Please input end date.'
  modalPurpose: string = 'add'; // add - adding a new entry, edit - editing new entry. delete - confirmation message

  isUserHasCv: boolean = false;

  allITLang = ITSkills.allITLang;
  allITLangArray = ITSkills.allITLangArray;
  autoCompleteOptions = {
    data: ITSkills.allITLang,
    limit: 5,
    minLength: 1
  }
  chipsInit = { autocompleteOptions: this.autoCompleteOptions };

  constructor(public cvBuilderService: CvBuilderService,
    private route: ActivatedRoute
  ) { }

  /**
   * initialize the component by setting experience and access control for the page.
   * @memberof ExperienceComponent
   */
  ngOnInit() {
    this.cvBuilderService.isUserHasCv.subscribe(this.setHasCv)
    this.cvBuilderService.experiences.subscribe(this.onExperienceChange);
    this.cvBuilderService.accessControl.subscribe(canEdit => this.canEdit = canEdit);
    this.setNewExperience(this.getDummyExperience());
    this.setValidationObject();
  }

  
  /**
   * adds new skills into usedSkills array entered by user 
   * @param {*} chip
   * @memberof ExperienceComponent
   */
  addSkill(chip) {
    if(this.allITLangArray.includes(chip.tag) && this.newExperience.usedSkills.length < 5){
      this.newExperience.usedSkills.push({tag: chip.tag});
    }
    else{
      this.rqChipsActions.emit({ action:"material_chip", params:[{data: this.newExperience.usedSkills, autocompleteOptions: this.autoCompleteOptions}] });
    }    
  }

  /**
   *  deletes skill from usedSkills array entered by user 
   *
   * @param {*} chip
   * @memberof ExperienceComponent
   */
  deleteSkill(chip) {
    this.newExperience.usedSkills = this.newExperience.usedSkills.filter(item => item.tag != chip.tag);
  }

  setHasCv = hasCv => {
    this.isUserHasCv = hasCv;
  }
 
  /**
   * convert skills array, from string of array to object of array.
   * @param {*} experiences
   * @returns
   * @memberof ExperienceComponent
   */
  formatSkillsForChips (experiences){
    let experiencesList = JSON.parse(JSON.stringify(experiences));
    experiencesList.map((experience)=>{
      experience.usedSkills = experience.usedSkills.map( skill => { 
        return { tag: skill} 
      });
      return experience;
    });
    return experiencesList;
  }

  onExperienceChange = experiences => {
    experiences.length ? this.setExperiences(this.formatSkillsForChips(experiences)) : this.setExperiences([]);
  }

  /**
   * set experience return by subscriber
   * @memberof ExperienceComponent
   */
  setExperiences = experience => {
    this.experiences = experience;
  }

  /**
   * set modal purpose to add, set new experience, validations object and opens the modal
   * @memberof ExperienceComponent
   */
  createExperience() {
    this.modalPurpose = 'add';
    this.setNewExperience(this.getDummyExperience());
    this.rqChipsActions.emit({ action:"material_chip", params:[{data: '', autocompleteOptions: this.autoCompleteOptions}] });
    this.setValidationObject();
    this.openModal();
  }

  /**
   * sets modal purpose to edit and sets Experience, validation object
   * emits actions for chips & then opens the modal
   * @param {Experience} experience
   * @memberof ExperienceComponent
   */
  openEditExperience(experience: Experience) {
    this.modalPurpose = 'edit';
    this.setValidationObject();
    this.setNewExperience(experience);
    this.rqChipsActions.emit({ action:"material_chip", params:[{data: this.newExperience.usedSkills, autocompleteOptions: this.autoCompleteOptions}] });
    setTimeout(() => {
      this.openModal();
    });
    setTimeout(() => {
      Materialize.updateTextFields();
    });
  }

  /**
   * sets modal purpose to delete and opens the modal
   * @param {*} experienceId
   * @memberof ExperienceComponent
   */
  showDeleteConfirmDialigue(experienceId) {
    this.modalPurpose = 'delete';
    this.currentRecordID = experienceId;
    setTimeout(() => {
      this.openModal();
    });  }

  
  /**
   *  opens a modal
   * @memberof ExperienceComponent
   */
  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  /**
   *
   *
   * @memberof ExperienceComponent
   */
  closeModal() {
    this.modalPurpose = 'add';
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  /**
   *  sets new expereince object with passed Experience
   * @param {Experience} experience
   * @memberof ExperienceComponent
   */
  setNewExperience(experience: Experience) {
    this.newExperience =  {
      _id: experience._id,
      title: experience.title,
      usedSkills: experience.usedSkills,  
      description: experience.description,
      startDate: experience.startDate,  endDate: experience.endDate
    }

    // convert dates in readable format
    if (experience.startDate) {
      this.newExperience.startDate = moment(this.newExperience.startDate).format('ll');
    }
    if (experience.endDate) {
      this.newExperience.endDate = moment(this.newExperience.endDate).format('ll');
    }
  }

  /**
   * initialize valition object with all fields set to true
   * @memberof ExperienceComponent
   */
  setValidationObject() {
    this.isValidCurrentExperience = {
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      active: true
    }
  }


  /**
   * returns empty expereince object
   * @returns
   * @memberof ExperienceComponent
   */
  getDummyExperience() {
    return { _id: '', title: '', description: '', usedSkills: [], startDate: '', endDate: '', active: false };
  }

  
  /**
   * @param {Experience[]} experience
   * @param {string} recordId
   * @returns
   * @memberof ExperienceComponent
   */
  getExperienceToSow(experience: Experience[], recordId: string) {
    return experience.find(record => record._id == recordId);
  }

  /**
   * @param {*} event
   * @param {*} field
   * @memberof ExperienceComponent
   */
  onInputChange(event, field) {
    this.newExperience[field] = event.target.value;
    this.isValidCurrentExperience[field] = true;
  }

  /**
   *  check if string is valid or no
   * @param {string} input
   * @returns boolean
   * @memberof ExperienceComponent
   */
  isInputValid (input: string) {
    return (input && input.trim() && input !== undefined) ? true : false;
  }

  /**
   * checks if form is valid
   * @param {Experience} experience
   * @returns boolean
   * @memberof ExperienceComponent
   */
  isFormValid(experience: Experience) {
    let formValid = true;

    if (!this.isInputValid(experience.title)) {
      this.isValidCurrentExperience.title = false;
      formValid = false;
    } else {
      this.isValidCurrentExperience.title = true;
    }

    if (!this.isInputValid(experience.description)) {
      this.isValidCurrentExperience.description = false;
      formValid = false;
    } else {
      this.isValidCurrentExperience.description = true;
    }
    
    if (!moment(experience.startDate).isValid()) {
      this.isValidCurrentExperience.startDate = false;
      formValid = false;
      this.invalidFromDateMsg = 'Please input start date.'
    } else {
      if(moment(experience.startDate).isAfter(moment())){
        this.invalidFromDateMsg = 'Start date not be greater than todays date.'
        this.isValidCurrentExperience.startDate = false;
        formValid = false;
      } else {
        this.isValidCurrentExperience.startDate = true;
      }
    }

    if (!moment(experience.endDate).isValid()) {
      this.isValidCurrentExperience.endDate = false;
      formValid = false;
      this.inValidDateMsg = 'Please input end date.';
    } else {
      this.isValidCurrentExperience.endDate = true;
      const endDate = moment(experience.endDate);
      const startDate = moment(experience.startDate);
      if (endDate.diff(startDate, 'month') < 1) {
        formValid = false;
        this.isValidCurrentExperience.endDate = false;
        this.inValidDateMsg = 'Start date should be smaller than end date by a month or more.';
      }
    }
    return formValid;
  }

  convertSkills = (skills) =>{
    return skills.map(skill => skill.tag);
  }

  /**
   *
   *
   * @memberof ExperienceComponent
   */
  submitExperience () {
    if (this.isFormValid(this.newExperience)) {
      let experience = Object.assign({}, this.newExperience);
      experience.usedSkills = this.convertSkills(experience.usedSkills);
      switch (this.modalPurpose) {
       case 'add':
          this.addExperience(experience);
          break;
       case 'edit':
          this.updateExperience(experience) 
          break;
      }
     }
   }
   

  /**
   *
   * @memberof ExperienceComponent
   */
  addExperience(newExperience) {
    this.cvBuilderService.addExperience(newExperience).then(this.onExperienceSubmitSuccess).catch(this.onExperienceSubmitFailed);
  }

  /**
   *
   * @memberof ExperienceComponent
   */
  updateExperience(newExperience) {
    this.cvBuilderService.updateExperience(newExperience).then(this.onExperienceSubmitSuccess).catch(this.onExperienceSubmitFailed);
  }

  /**
   *
   * @memberof ExperienceComponent
   */
  deleteExperience() {
    this.cvBuilderService.deleteExperience(this.currentRecordID).then(this.onExperienceDeleteSuccess).catch(this.onExperienceSubmitFailed);
  }

  /**
   *
   *
   * @memberof ExperienceComponent
   */
  onExperienceSubmitSuccess = (response) => {
    response.success ? this.cvBuilderService.setExperience(response.experiences) : false;
    toast(response.message, 2000);
    this.closeModal();
  }

  /**
   *
   * @memberof ExperienceComponent
   */
  onExperienceDeleteSuccess = (response) => {
    this.closeModal();
    toast(response.message, 2000);
    if (response.success) {
      this.cvBuilderService.setExperience(response.experience);
      this.currentRecordID = null;
    }
  }

  /**
   *
   * @memberof ExperienceComponent
   */
  onExperienceSubmitFailed = (err) => {
    toast(err, 2000);
  }

}
