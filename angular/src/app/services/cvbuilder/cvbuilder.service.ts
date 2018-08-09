import { Injectable } from '@angular/core';
import { CoreHttpService }                                  from '../core-http.service';
import { BehaviorSubject } from 'rxjs';
import { Education } from '../../model/education';
import { Experience } from '../../model/experience';
import { Project } from '../../model/project';
import { Certification } from '../../model/certification';
import { AuthService } from '../../services/auth/auth.service';


/**
 *
 * @export
 * @class CvBuilderService
 */
@Injectable()
export class CvBuilderService {

  private _globalConfig = new BehaviorSubject<any>({});
  public globalConfig = this._globalConfig.asObservable();

  private _loadingSubject = new BehaviorSubject<boolean>(false);
  public showLoader = this._loadingSubject.asObservable();

  private _educationsSubject = new BehaviorSubject<Education[]>([new Education()]);
  public educations = this._educationsSubject.asObservable();
  
  private _experienceSubject = new BehaviorSubject<Experience[]>([new Experience()]);
  public experiences = this._experienceSubject.asObservable();

  private _projectsSubject = new BehaviorSubject<Project[]>([new Project()]);
  public projects = this._projectsSubject.asObservable();

  private _certificationSubject = new BehaviorSubject<Certification[]>([new Certification()]);
  public certifications = this._certificationSubject.asObservable();
  
  private _skillsSubject = new BehaviorSubject<{}>({});
  public skills = this._skillsSubject.asObservable();

  private _personalInterestSubject = new BehaviorSubject<{}>({});
  public personalInterest = this._personalInterestSubject.asObservable();

  private _remarksSubject = new BehaviorSubject<string>('');
  public remarks = this._remarksSubject.asObservable();

  private _skypeIdSubject = new BehaviorSubject<string>('');
  public skypeId = this._skypeIdSubject.asObservable();

  private _addressSubject = new BehaviorSubject<string>('');
  public address = this._addressSubject.asObservable();

  private _accessControlSubject = new BehaviorSubject<boolean>(false);
  public accessControl = this._accessControlSubject.asObservable();

  
  constructor(
    private httpService:CoreHttpService,
    private authService: AuthService
  ){
  }

  /**
   * loads the cv details 
   * @memberof CvBuilderService
   */
  loadCv = (userId) => {
    const extension = 'cv/cvdetails/' + userId;
    this.httpService.get(extension).then(this.applyData);
  }

  // getConfigFiles = () =>{
  //   this.httpService.get('user/getconfigfile').then(response => {
  //     this._globalConfig.next(response);
  //   });
  // }

  setEducations(educations) {
    this._educationsSubject.next(educations);
  }

  setExperience(experiences) {
    this._experienceSubject.next(experiences);
  }

  setProjects(projects) {
    this._projectsSubject.next(projects);
  }

  setCertifications(certifications) {
    this._certificationSubject.next(certifications);
  }

  setSkills(skills) {
    this._skillsSubject.next(skills);
  }

  setPersonalInterest(personalInterests) {
    this._personalInterestSubject.next(personalInterests);
  }

  setRemarks(remarks: string) {
    this._remarksSubject.next(remarks);
  }

  setAddress(address: string) {
    this._addressSubject.next(address);
  }

  setAccessControl(canEdit: boolean) {
    this._accessControlSubject.next(canEdit);
  }

  setSkypeId(skypeId: string) {
    this._skillsSubject.next(skypeId);
  }

  setShowLoader(showLoader: boolean) {
    this._loadingSubject.next(showLoader);
  }

  applyData = (response) => {
    const data = response.cvdetails;

    if(response.canEdit){
      this.setAccessControl(response.canEdit);
    }

    if(!data){
      return;
    }

    if(data.educations){
      this.setEducations(data.educations);
    }

    if(data.experience){
      this.setExperience(data.experience);
    }

    if(data.projects){
      this.setProjects(data.projects)
    }

    if(data.certifications){
      this.setCertifications(data.certifications);
    }

    if(data.personalInterest){
      this.setPersonalInterest(data.personalInterest)
    }

    if(data.skills){
      this.setSkills(data.skills);
    }

    if(data.address){
      this.setAddress(data.address);
    }

    if(data.skypeId){
      this.setSkypeId(data.skypeId);
    }

  }

  getUserId () {
     return this.authService.user._id;
  }

  addEducation (education: Education) {
    const data ={ education : education, userId :  this.getUserId() }
    return this.httpService.post('cv/addEducation', data);
  }

  deleteEducation (educationID: string) {
    const data = { educationID : educationID,  userId :  this.getUserId() }
    return this.httpService.delete('cv/deleteEducation', data);
  }
  
  updateEducation (education: Education) {
    const data = { education : education, userId :  this.getUserId() }
    return this.httpService.put('cv/updateEducation', data);
  }

  
  addExperience (experience: Experience) {
    const data ={ experience : experience, userId :  this.getUserId() }
    return this.httpService.post('cv/addExperience', data);
  }

  deleteExperience (experienceId: string) {
    const data = { experienceId : experienceId,  userId :  this.getUserId() }
    return this.httpService.delete('cv/deleteExperience', data);
  }
  
  updateExperience (experience: Experience) {
    const data = { experience : experience, userId :  this.getUserId() }
    return this.httpService.put('cv/updateExperience', data);
  }

  

  addProject (project: Project) {
    const data ={ project : project, userId :  this.getUserId() }
    return this.httpService.post('cv/addProjects', data);
  }

  deleteProject (projectId: string) {
    const data = { projectId : projectId,  userId :  this.getUserId() }
    return this.httpService.delete('cv/deleteProject', data);
  }
  
  updateProject (project: Project) {
    const data = { project : project, userId :  this.getUserId() }
    return this.httpService.put('cv/updateProject', data);
  }
  
}


