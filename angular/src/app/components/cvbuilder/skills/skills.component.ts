import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { toast, MaterializeAction } from 'angular2-materialize';
import { EventEmitter } from '@angular/core';

import { CvBuilderService } from '../../../services/cvbuilder/cvbuilder.service';
import { ITSkills } from '../../../helpers/ITSkills.helper';

declare let Materialize: any;
declare let  $ : any;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();   
  techSkillChipsActios = new EventEmitter<string|MaterializeAction>(); // stores events for chips
  languageSkillChipsActions = new EventEmitter<string|MaterializeAction>();

  canEdit: boolean = false;         // access control to allow or disallow user from adding/ deleting records
  skills: {  techSkills?:any[],
             otherStrengths?: String , 
             languageSkills?: any[]  };
 
  techSkills:any[] = [];
  otherStrengths: String = '';
  languageSkills: any[] = [];

  skillValidObject = {
    techSkills : true,
    languageSkills: true
  }
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
   * initialize the component by setting skill and access control for the page.
   * @memberof SkillsComponent
   */
  ngOnInit() {
    this.cvBuilderService.isUserHasCv.subscribe(this.setHasCv)
    this.cvBuilderService.skills.subscribe(this.onSkillsChange);
    this.cvBuilderService.accessControl.subscribe(canEdit => this.canEdit = canEdit);
  }


  setHasCv = hasCv => {
    this.isUserHasCv = hasCv;
  }

  formatSkillsForChips(skills) {
    let skillsObject = JSON.parse(JSON.stringify(skills));
    skillsObject.techSkills = skillsObject.techSkills.map(techSkill => {
      return { tag: techSkill }
    });
    skillsObject.languageSkills = skillsObject.languageSkills.map(languageSkills => {
      return { tag: languageSkills }
    });
    return skillsObject;
  }

  onSkillsChange = skills => {
   this.setSkills(this.formatSkillsForChips(skills))
  }
  /**
   * set skills return by subscriber
   * @memberof SkillsComponent
   */
  setSkills = skills => {
    this.skills = skills;
  }

  addTechSkill(chip) {
    if(this.allITLangArray.includes(chip.tag) && this.techSkills.length < 10){
      this.techSkills.push({tag: chip.tag});
    }
    else{
      this.techSkillChipsActios.emit({ action:"material_chip", params:[{data: this.techSkills, autocompleteOptions: this.autoCompleteOptions}] });
    }    
  }

  deleteTechSkill(chip) {
    this.techSkills= this.techSkills.filter(item => item.tag != chip.tag);
  }

  isDuplicate (newSkill) {
    return this.languageSkills.find(skill => {
      return skill.tag.toLowerCase() == newSkill.toLowerCase()
    });
    
  }

  addLanguageSkill(chip) {
    if(this.isInputValid(chip.tag) && chip.tag.length < 20 && !this.isDuplicate(chip.tag) && this.languageSkills.length < 5){
      this.languageSkills.push({tag: chip.tag});
    }
    else{
      this.languageSkillChipsActions.emit({ action:"material_chip", params:[{data: this.languageSkills}] });
    }    
  }

  deleteLanguageSkill(chip) {
    this.languageSkills= this.languageSkills.filter(item => item.tag != chip.tag);
  }

  convertSkills = (skills) =>{
    return skills.map(skill => skill.tag);
  }

  getEditedSkill() {
   return {
     techSkills : this.convertSkills(this.techSkills),
     otherStrengths: this.otherStrengths,
     languageSkills: this.convertSkills(this.languageSkills)
   }
  }

  /**
   * assign old skills to show on edit modal
   *
   * @memberof SkillsComponent
   */
  initPrevSkill (skills) {
    this.techSkills = Array.from(skills.techSkills);
    this.otherStrengths = skills.otherStrengths;
    this.languageSkills = Array.from(skills.languageSkills);
  }

  editSkills() {
    this.modalPurpose = 'edit';
    this.initPrevSkill(this.skills);
    this.openModal();
    this.techSkillChipsActios.emit({ action:"material_chip", params:[{data: this.skills.techSkills, autocompleteOptions: this.autoCompleteOptions}] });
    this.languageSkillChipsActions.emit({ action:"material_chip", params:[{data: this.skills.languageSkills}] });
    setTimeout(() => {
      Materialize.updateTextFields();
      this.autoresizeTextArea();
    });
  }

  autoresizeTextArea () {
    $('textarea, .input').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });

    $('.chipInp input').each(function(){
      $(this).focusin()
    })
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

  onInputChange(event, field) {
    this.skillValidObject[field] = true;
  }

  /**
   * @memberof SkillsComponent
   */
  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  /**
   *
   * @memberof SkillsComponent
   */
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }


  isFormValid (skills) {
    let formValid = true;

    if (skills.techSkills.length < 2 ) {
      this.skillValidObject.techSkills = false;
      formValid = false;
    } else {
      this.skillValidObject.techSkills = true;
    }

    if (!skills.languageSkills.length) {
      this.skillValidObject.languageSkills = false;
      formValid = false;
    } else {
      this.skillValidObject.languageSkills = true;
    }
    return formValid;
  }

  /**
   * @memberof SkillsComponent
   */
  updateSkills() {
    const newSkills = this.getEditedSkill();
    if(this.isFormValid(newSkills)){
      this.cvBuilderService.updateSkills(newSkills).then(this.onSkillsSubmitSuccess).catch(this.onSkillsSubmitFailed);
    }
  }


  /**
   *
   * @memberof SkillsComponent
   */
  onSkillsSubmitSuccess = (response) => {
    response.success ? this.cvBuilderService.setSkills(response.skills) : false;
    toast(response.message, 2000);
    this.closeModal();
  }

  /**
   *
   * @memberof SkillsComponent
   */
  onSkillsSubmitFailed = (err) => {
    toast(err, 2000);
  }

}
