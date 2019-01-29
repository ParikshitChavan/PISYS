import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params }                 from '@angular/router';
import { EventEmitter } from '@angular/core';

import {MaterializeAction, toast} from 'angular2-materialize';

import { CvBuilderService } from '../../services/cvbuilder/cvbuilder.service'
import { AuthService } from "../../services/auth/auth.service";
import { CompanyApiService } from '../../services/companyAPI/company-api.service';

import * as moment from 'moment';


interface FileReaderEventTarget extends EventTarget {
  result:string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget
}

declare let Materialize: any;
const VIDEOLENGTH = 75; 

@Component({
  selector: 'app-cvbuilder',
  templateUrl: './cvbuilder.component.html',
  styleUrls: ['./cvbuilder.component.css'],
  providers: [ CvBuilderService ] // a service for cv builder to save and share data
})
export class CvBuilderComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef;
  @ViewChild('previewVideo') previewVideo: ElementRef;
  @ViewChild('videoPlayer') videoPlayer:ElementRef;

  modalActions = new EventEmitter<string|MaterializeAction>();
  preLoadModalActions = new EventEmitter<string|MaterializeAction>();
  confirmProfileChange = new EventEmitter<string|MaterializeAction>();


  public _actionProgress: string = 'action'; // form to add new entry into one of the subsection.  action to show a message like failed, invalid.
  userAccess = 0;
  userId : string = '';
  loading: boolean = false;
  videoDetails = {
    location : '',
    key: '',
    signExpiry: ''
  }
  videoProfileUrl = '';
  personalDetails = { name:'', DOB:'', address:'', DP:{} };
  canEdit : boolean = false;
  uploadedFile : File;
  fileStatus : number = 0;
  showFileUpload : boolean = false;

  videoProfilePreviewUrl = '';
  disabledUpload: boolean = true;

  retrivingVideoStatus: boolean = false;
  linkRetrivalCount = 0;
  isProfilePublished : boolean = false;
  profileChangeMessage: string = '';
  fileStatusMsg = ['',
   'Please select a file.', 
   'Only mp4 files are allowed.', 
   'File size should be smaller than 150 MB.', 
   'Video length should be max to 1.30 mins.'];

  allowedFileType = [ 'video/mp4'];
  myCmp = {
    _id: '',
    name: '',
    shrtlstd: [],
    cntacd: []
  };

  constructor(private cvBuilderService: CvBuilderService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private companyService: CompanyApiService 
  ) { }

  ngOnInit() {
    this.myCmp = JSON.parse(localStorage.getItem('user')).company;
    this.route.params.subscribe( (params:Params)=>{
      this.userId = params['id'];
      this.cvBuilderService.setUserId(this.userId);
      this.cvBuilderService.loadCv(this.userId);
      this.setUserAccess(this.authService.user.access);
      this.cvBuilderService.profileVideo.subscribe(this.setVideo);
      this.cvBuilderService.personalDetails.subscribe(this.setPersonalDetails);
      this.cvBuilderService.accessControl.subscribe(this.setAccesssControl);
      this.cvBuilderService.isProfilePublished.subscribe(this.setProfilePublished);
     })
  }

  onVideoError(event) {
    if ( event.target.error.code > 1 && this.videoDetails.key && !this.retrivingVideoStatus && this.linkRetrivalCount < 3 ) {
      this.retrivingVideoStatus = true;
      this.cvBuilderService.retriveSignedUrlVideo(this.videoDetails.key).then(this.onVideoRetrivalSuccess).catch(this.postRetrival)
    }
  }

  onVideoRetrivalSuccess = (resp)  =>{
    if(resp.profileVideo){
      this.cvBuilderService.setProfileVideo(resp.profileVideo);
    }
    this.postRetrival();
  }

  postRetrival () {
    this.retrivingVideoStatus = false;
    this.linkRetrivalCount += 1;
  }

  setProfilePublished = (isProfilePublished) => {
    this.isProfilePublished = isProfilePublished;
  }

  setAccesssControl = (canEdit) => {
    this.canEdit = canEdit
  }

  setPersonalDetails = (personalDetails) => {
    this.personalDetails = personalDetails;
  }

  setUserAccess = (accessCode) =>{
      this.userAccess = accessCode;
  }

  setVideo = (videoDetails)=>{
    if(videoDetails && videoDetails.location){
      this.videoDetails = videoDetails;
    }
  }

  isValidFile (file: File) {

    if(!(file instanceof File)) {
      this.fileStatus = 1;
      return false;
    }

    if(!this.allowedFileType.includes(file.type)){
      this.fileStatus = 2;
      return false;
    }
    
    if((file.size / (1024 * 1024)) > 150 ) {
      this.fileStatus = 3;
      return false;
    }
    this.fileStatus = 0;
    return true;
  }

  onFileSelect(event) {
    this.disabledUpload = true;
    let files  = event.target.files;
    this.fileStatus = 0;
    if(files.length && this.isValidFile(files[0])){
      this.uploadedFile = files[0];
      this.setPreview(this.uploadedFile);
    }else{
      this.uploadedFile = null;
    }
  }

  setPreview (file) {
    var fileReader = new FileReader();
      fileReader.onload = () => {
        var blob = new Blob([fileReader.result], {type: file.type});
        var url = URL.createObjectURL(blob);
        this.previewVideo.nativeElement.ondurationchange = this.durationChange;
        this.previewVideo.nativeElement.preload = 'metadata';
        this.setPreviewUrl(url);
        // Load video in Safari / IE11
        this.previewVideo.nativeElement.muted = true;
        this.previewVideo.nativeElement.play();
      };
      fileReader.readAsArrayBuffer(file);
  }

  durationChange = (evnt) =>{
    if(this.previewVideo.nativeElement.duration < VIDEOLENGTH){
      this.disabledUpload = false;
      this.fileStatus = 0;
    }else{
      this.fileStatus = 4;
    }
  }

  setPreviewUrl = ( url) => {
    this.previewVideo.nativeElement.src = url;
  }

  uploadVideo () {
    if(this.isValidFile(this.uploadedFile)){
      let formData: FormData = new FormData();
      formData.append('displayVideo',  this.uploadedFile);
      this.closeFileUploadModal();  // close form modal
      this.openModal();             // open loader
      this.cvBuilderService.updateProfileVideo(formData).then(this.onFileUploadSuccess).catch(this.onFileUploadFailure);
    }
  }

  onFileUploadSuccess = (resp) => {
    this.cvBuilderService.setProfileVideo(resp.profileVideo);
    this.postUploadFile('Your video profile has been added succuessfully');
  }

  postUploadFile = (msg) => {
    this.uploadedFile = null;
    this.postApiCall(msg);
  }

  postApiCall(msg){
    this.closeModal();
    toast(msg, 2000);
  }

  onFileUploadFailure  = (resp) => {
    this.postUploadFile('Failed to upload video, Please try again later');
  }

  showFileUploadModal() {
    this.setPreviewUrl('');
    this.fileUploader.nativeElement.form.reset()
    this.uploadedFile = null;
    this.fileStatus = 0;
    this.disabledUpload = true;
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeFileUploadModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  /**
   * modal methods to close and open
   * @memberof CvBuilderComponent
   */
  openModal() {
    this.showFileUpload = true;
    this.preLoadModalActions.emit({action:"modal",params:['open']});
  }

  /**
   * @memberof CvBuilderComponent
   */
  closeModal() {
    this.showFileUpload = false;
    this.preLoadModalActions.emit({action:"modal",params:['close']});
  }

  showPofileChange() {
    this.confirmProfileChange.emit({action:"modal",params:['open']});
  }

  hidePofileChange() {
    this.confirmProfileChange.emit({action:"modal",params:['close']});
  }

  onProfileStatusChange () {
    this.profileChangeMessage = this.isProfilePublished ? 'After you publish, recruiter will be able to see your profile.' : 'After you unpublish, recruiters will not be able to see your profile.'
    this.showPofileChange();
  }

  cancelProfileChange(){
    this.isProfilePublished = !this.isProfilePublished;
    this.hidePofileChange();
  }

  updatePublishStatue () {
      this.cvBuilderService.updateProfileStatus(this.isProfilePublished).then(this.onPublishChangeSuccess).catch(this.onPublishchangeFail);
  }

  onPublishChangeSuccess = (resp) => {
    this.postApiCall('Profile status have been changed successfully.')
  }

  onPublishchangeFail = () => {
    this.postApiCall('Failed to update the profile status');
  }

  shortlistClicked(){
    this.companyService.addShortlisted(this.myCmp._id, this.userId).subscribe( resp =>{
      if(!resp.success){
        console.log(resp.error);
        return toast('some error occurred, please check the console for more details.', 3000);
      }
      let userData = JSON.parse(localStorage.getItem('user'));
      userData.company.shrtlstd.push(this.userId);
      this.authService.saveUserInfo(userData);
      this.myCmp = userData.company.shrtlstd;
      toast('User shortlisted successfully', 3000);
    });
  }

  contactClicked(){
    this.companyService.contactCandidate(this.myCmp._id, this.userId).subscribe( resp =>{
      if(!resp.success){
        console.log(resp.error);
        return toast('some error occurred, please check the console for more details.', 3000);
      }
      let userData = JSON.parse(localStorage.getItem('user'));
      userData.company.cntacd.push(this.userId);
      this.authService.saveUserInfo(userData);
      this.myCmp = userData.company.cntacd;
      toast('User contacted successfully', 3000);
    });
  }

}
