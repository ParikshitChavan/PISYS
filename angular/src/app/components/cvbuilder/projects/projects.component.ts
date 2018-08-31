import { Component, OnInit } from '@angular/core';

import { toast, MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';

import * as moment from 'moment';
import { CvBuilderService } from '../../../services/cvbuilder/cvbuilder.service';
import { Project } from '../../../model/project';
import { ITSkills } from '../../../helpers/ITSkills.helper';

declare let Materialize: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();
  rqChipsActions = new EventEmitter<string|MaterializeAction>();

  projects: Project[] = [];
  newProject: Project;
  selectedProjectIndex: boolean = false;
  isValidCurrentProject;
  currentRecordID;
  canEdit: boolean = false;

  loading: boolean = true;
  modalPurpose: string = 'add'; // add - adding a new entry, edit - editing new entry. delete - confirmation message


  invalidFromDateMsg: string =  'Please input start date.';
  inValidDateMsg: string = 'Please input end date.'
  
  allITLang = ITSkills.allITLang;
  allITLangArray = ITSkills.allITLangArray;
  autoCompleteOptions = {
    data: ITSkills.allITLang,
    limit: 5,
    minLength: 1
  }
  chipsInit = { autocompleteOptions: this.autoCompleteOptions };
  isUserHasCv: boolean = false;

  constructor(public cvBuilderService: CvBuilderService) { }

  /**
   *
   * @memberof ProjectComponent
   */
  ngOnInit() {
    this.cvBuilderService.isUserHasCv.subscribe(this.setHasCv)
    this.cvBuilderService.projects.subscribe(this.setProjects);
    this.cvBuilderService.accessControl.subscribe(canEdit => this.canEdit = canEdit);
    this.setNewProject(this.getDummyProject());
    this.setValidationObject();
  }

  setHasCv = hasCv => {
    this.isUserHasCv = hasCv;
  }

  /**
   *
   * @memberof ProjectComponent
   */
  setProjects = project => {
    this.projects = project;
  }

  typeOf(variable) {
    return typeof(variable);
  }
  /**
   *
   *
   * @memberof ProjectComponent
   */
  createProject() {
    this.modalPurpose = 'add';
    this.setNewProject(this.getDummyProject());
    this.rqChipsActions.emit({ action:"material_chip", params:[{data: '', autocompleteOptions: this.autoCompleteOptions}] });
    this.setValidationObject();
    this.openModal();
  }

  /**
   *
   *
   * @param {Project} project
   * @memberof ProjectComponent
   */
  openEditProject(project: Project) {
    this.modalPurpose = 'edit';
    this.setValidationObject();
    this.setNewProject(project);
    this.rqChipsActions.emit({ action:"material_chip", params:[{data: this.newProject.usedSkills, autocompleteOptions: this.autoCompleteOptions}] });
    setTimeout(() => {
      this.openModal();
    });
    setTimeout(() => {
      Materialize.updateTextFields();
    });
  }

  /**
   *
   *
   * @param {*} projectId
   * @memberof ProjectComponent
   */
  showDeleteConfirmDialigue(projectId) {
    this.modalPurpose = 'delete';
    this.currentRecordID = projectId;
    setTimeout(() => {
      this.openModal();
    });  }

  
  /**
   * @memberof ProjectComponent
   */
  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  /**
   *
   * @memberof ProjectComponent
   */
  closeModal() {
    this.modalPurpose = 'add';
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  /**
   * @param {Project} project
   * @memberof ProjectComponent
   */
  setNewProject(project: Project) {
    this.newProject =  Object.assign({}, project);
    this.newProject.usedSkills =  [...project.usedSkills]

    // convert dates in readable format
    if (project.startDate) {
      this.newProject.startDate = moment(this.newProject.startDate).format('ll');
    }
    if (project.endDate) {
      this.newProject.endDate = moment(this.newProject.endDate).format('ll');
    }
  }

  /**
   *
   *
   * @memberof ProjectComponent
   */
  setValidationObject() {
    this.isValidCurrentProject = {
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      active: true,
      teamSize: true,
      responsibilities: true
    }
  }


  /**
   *
   * @returns
   * @memberof ProjectComponent
   */
  getDummyProject() {
    return { _id: '', title: '', description: '', usedSkills: [], startDate: '', endDate: '', teamSize: 1,   responsibilities: '' };
  }

  /**
   *
   *
   * @param {Project[]} project
   * @param {*} recordId
   * @returns
   * @memberof ProjectComponent
   */
  getProjectToSow(project: Project[], recordId) {
    return project.find(record => record._id == recordId);
  }

  /**
   * @param {*} event
   * @param {*} field
   * @memberof ProjectComponent
   */
  onInputChange(event, field) {
    this.newProject[field] = event.target.value;
    this.isValidCurrentProject[field] = true;
  }

  /**
   *
   *
   * @param {string} input
   * @returns
   * @memberof ProjectComponent
   */
  isInputValid(input: string) {
    return (input && input.trim() && input !== undefined) ? true : false;
  }

  /**
   *
   *
   * @param {Project} project
   * @returns
   * @memberof ProjectComponent
   */
  isFormValid(project: Project) {
    let formValid = true;

    if (!this.isInputValid(project.title)) {
      this.isValidCurrentProject.title = false;
      formValid = false;
    } else {
      this.isValidCurrentProject.title = true;
    }

    if (!this.isInputValid(project.description)) {
      this.isValidCurrentProject.description = false;
      formValid = false;
    } else {
      this.isValidCurrentProject.description = true;
    }

    if (!this.isInputValid(project.responsibilities)) {
      this.isValidCurrentProject.responsibilities = false;
      formValid = false;
    } else {
      this.isValidCurrentProject.responsibilities = true;
    }

    if (project.teamSize < 1) {
      this.isValidCurrentProject.teamSize = false;
      formValid = false;
    } else {
      this.isValidCurrentProject.teamSize = true;
    }

    if (!moment(project.startDate).isValid()) {
      this.isValidCurrentProject.startDate = false;
      formValid = false;
      this.invalidFromDateMsg = 'Please input start date.';
    } else {
      if(moment(project.startDate).isAfter(moment())){
        this.invalidFromDateMsg = 'Start date should not be greater than todays date.'
        this.isValidCurrentProject.startDate = false;
        formValid = false;
      } else {
        this.isValidCurrentProject.startDate = true;
      }
    }

    if (!moment(project.endDate).isValid()) {
      this.isValidCurrentProject.endDate = false;
      formValid = false;
      this.inValidDateMsg = 'Please input end date.';
    } else {
      this.isValidCurrentProject.endDate = true;
      const endDate = moment(project.endDate);
      const startDate = moment(project.startDate);
      if (endDate.diff(startDate, 'month') < 1) {
        formValid = false;
        this.isValidCurrentProject.endDate = false;
        this.inValidDateMsg = 'Start date should be smaller than end date by a month or more.';
      }
    }
    return formValid;
  }


  /**
   *
   *
   * @memberof ProjectComponent
   */
  submitProject () {
    if (this.isFormValid(this.newProject)) {
      switch (this.modalPurpose) {
       case 'add':
          this.addProject();
          break;
       case 'edit':
          this.updateProject() 
          break;
      }
     }
   }
   

  /**
   *
   * @memberof ProjectComponent
   */
  addProject() {
    this.cvBuilderService.addProject(this.newProject).then(this.onProjectSubmitSuccess).catch(this.onProjectSubmitFailed);
  }

  /**
   *
   * @memberof ProjectComponent
   */
  updateProject() {
    this.cvBuilderService.updateProject(this.newProject).then(this.onProjectSubmitSuccess).catch(this.onProjectSubmitFailed);
  }

  /**
   *
   *
   * @memberof ProjectComponent
   */
  deleteProject() {
    this.cvBuilderService.deleteProject(this.currentRecordID).then(this.onProjectDeleteSuccess).catch(this.onProjectSubmitFailed);
  }

  /**
   *
   *
   * @memberof ProjectComponent
   */
  onProjectSubmitSuccess = (response) => {
    response.success ? this.cvBuilderService.setProjects(response.projects) : false;
    toast(response.message, 2000);
    this.closeModal();
  }

  /**
   *
   *
   * @memberof ProjectComponent
   */
  onProjectDeleteSuccess = (response) => {
    this.closeModal();
    toast(response.message, 2000);
    if (response.success) {
      this.cvBuilderService.setProjects(response.projects);
      this.selectedProjectIndex = false;
      this.currentRecordID = null;
    }
  }

  /**
   *
   *
   * @memberof ProjectComponent
   */
  onProjectSubmitFailed = (err) => {
    toast(err, 2000);
  }

  /**
   *
   *
   * @param {Project["usedSkills"]} skills
   * @param {*} newSkill
   * @returns
   * @memberof ProjectComponent
   */
  isDuplicateSkill(skills: Project["usedSkills"], newSkill){
    return skills.find(skill=> skill === newSkill.trim().toLocaleLowerCase())
  }


  addSkill(chip) {
    if(this.allITLangArray.includes(chip.tag) && this.newProject.usedSkills.length < 5){
      this.newProject.usedSkills.push({tag: chip.tag});
    }
    else{
      this.rqChipsActions.emit({ action:"material_chip", params:[{data: this.newProject.usedSkills, autocompleteOptions: this.autoCompleteOptions}] });
    }    
  }

  deleteSkill(chip) {
    this.newProject.usedSkills = this.newProject.usedSkills.filter(item => item.tag != chip.tag);
  }
}
