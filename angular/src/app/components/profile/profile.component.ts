import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import { toast } from 'angular2-materialize';
import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";

declare let Materialize:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editing: Boolean = false;
  userDetails: {
    _id: any
    name: string,
    DOB : any,
    phNum: string,
    DP: {key:string, url:string},
  }= {_id:'', name: "", DOB: "", phNum: "", DP: {key:"", url:""}};
  passwords: {
    currPass: string,
    newPass:string,
    cnfPass: string,
  } = {currPass: '', newPass: '', cnfPass:''}
  passwordMsg: string;
  userInfoMsg: string;
  displayPicMsg: string;
  imgName: string;
  imgData: any;
  cropperSettings :CropperSettings;
  croppedWidth: number;
  croppedHeight: number;

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  constructor(private authService: AuthService, private router:Router) { 
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;

    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;

    this.cropperSettings.canvasWidth = 800;
    this.cropperSettings.canvasHeight = 450;

    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;

    this.cropperSettings.rounded = true;
    //this.cropperSettings.keepAspect = false;

    this.cropperSettings.dynamicSizing = true;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

    this.imgData = {};
   }

   cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

  ngOnInit() {
    this.authService.getUserInfo().subscribe(resp => {
      if(!resp.success) return false;
      this.userDetails = resp.profileData;
    }, err => {
      console.log(err);
      return false;
    });
  }
   
  fileChangeListener($event) {
    let image:any = new Image();
    let file:File = $event.target.files[0];
    let myReader:FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent:any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  convertToBlob(base64Str:string){
    let binary = atob(base64Str.split(',')[1]);
    let array = [];
    let mimestring= base64Str.split(',')[0].split(':')[1].split(';')[0];
    for(let i = 0; i< binary.length; i++){
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimestring});
  }

  editInfoClick(){
    this.editing = true;
    Materialize.updateTextFields();
  }

  cancelInfoEditClick(){
    this.editing = false;
    Materialize.updateTextFields();
  }

  userInfoSubmit(validForm: boolean){
    if(!validForm) return false;
    this.editing = false;
    this.authService.updateUserInfo(this.userDetails).subscribe(resp =>{
      resp.success ? this.userInfoMsg = "User information updated successfully." : this.userInfoMsg = "Some error occurred, please try agin later.";
      toast(this.userInfoMsg, 3000);
    });
  }

  onDPUploadClick(){
    let formData:FormData = new FormData();
    let blob = this.convertToBlob( this.imgData.image);
    formData.append('displayPicture', blob);
    this.authService.updateDisplayPic(formData).subscribe(resp =>{
      if (resp.success){
        this.userDetails.DP.url =  resp.newLink;
        //load Header info as well
        this.displayPicMsg = "Display Picture updated successfully";
      }
      else {
        this.displayPicMsg = "Some error occurred, please try agin later";
      }
      toast(this.displayPicMsg, 3000);
    });
  }

  passwordChangeSubmit(validForm: boolean){
    if(!validForm) return false;
    if(this.passwords.newPass!=this.passwords.cnfPass) return false;
    let userData = { currentPassword: this.passwords.currPass, newPassword: this.passwords.newPass };
    this.authService.updatePassword(userData).subscribe( resp =>{
      if(!resp.success) {
        console.log(resp.error);
        return toast("Some Error occurred. check Console fro more details",3000);
      }
      toast("Password updated successfully, please login with your new password.",3000);
      this.authService.destroyToken();
      this.authService.destroyUserInfo();
      this.router.navigate(['/']);
    });
  }
}