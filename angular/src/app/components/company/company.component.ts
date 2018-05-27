import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyApiService } from "../../services/companyAPI/company-api.service";
import { toast } from 'angular2-materialize';
import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";

declare let Materialize:any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  editing: Boolean = false;
  editingAdmin : Boolean = false;
  companyDetails: {
    name: String,
    est : any,
    phNum: String,
    admins:any[],
    address:string,
    logo: {key:String, url:String}
  }= {name: "", est: "", phNum: "", admins:[], address:'', logo: {key:"", url:""}};
  newAdmin = {
    name:'',
    email:''
  }
  companyInfoMsg: String;
  logoMsg: String;
  adminManageMsg: String;
  imgName: String;
  imgData: any;
  cropperSettings :CropperSettings;
  croppedWidth: Number;
  croppedHeight: Number;

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  constructor(private companyAPIService: CompanyApiService, private router:Router) { 
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
    this.croppedHeight = bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

  ngOnInit() {
    this.companyAPIService.getCmpInfo().subscribe(resp => {
      if(!resp.success) return false;
      this.companyDetails = resp.companyData;
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
    let mimeString= base64Str.split(',')[0].split(':')[1].split(';')[0];
    for(let i = 0; i< binary.length; i++){
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  }

  editInfoClick(){
    this.editing = true;
    Materialize.updateTextFields();
  }

  cancelInfoEditClick(){
    this.editing = false;
    Materialize.updateTextFields();
  }

  addAdminClick(){
    this.editingAdmin = true;
    Materialize.updateTextFields();
  }

  cancelAdminEditClick(){
    this.editingAdmin = false;
  }

  cmpInfoSubmit(validForm: Boolean){
    if(!validForm) return false;
    this.editing = false;
    this.companyAPIService.updateCmpInfo(this.companyDetails).subscribe(resp =>{
      resp.success ? this.companyInfoMsg = "Company information updated successfully." : this.companyInfoMsg = "Some error occurred, please try agin later.";
      toast(this.companyInfoMsg, 3000);
    });
  }

  adminInfoSubmit(validForm: Boolean){
    if(!validForm) return false;
    this.editingAdmin = false;
    this.companyAPIService.addAdmin(this.newAdmin).subscribe(resp =>{
      resp.success ? this.companyInfoMsg = "New admin added successfully." : this.companyInfoMsg = "Some error occurred, please try agin later.";
      toast(this.companyInfoMsg, 3000);
    });
  }

  onLogoUploadClick(){
    let formData:FormData = new FormData();
    let blob = this.convertToBlob( this.imgData.image);
    formData.append('companyLogo', blob);
    this.companyAPIService.updateLogo(formData).subscribe(resp =>{
      if (resp.success){
        this.companyDetails.logo.url =  resp.newLink;
        this.logoMsg = "Company logo updated successfully."
      }
      else {
        this.logoMsg = "Some error occurred, please try agin later."
      }
      toast(this.logoMsg, 3000);
    });
  }
}
