import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyApiService } from "../../services/companyAPI/company-api.service";
import { toast, MaterializeAction } from 'angular2-materialize';
import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";

declare let Materialize: any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  editing: Boolean = false;
  editingAdmin : Boolean = false;
  urlCmpId = '';
  localUser: any;
  companyDetails: {
    _id : any,
    name: string,
    est : any,
    phNum: string,
    website: String,
    admins: any[],
    adminsArcv: any[],
    address: string,
    logo: { key: string, url: string },
    empSize: string
  } = { _id:'', name: '', est: '', phNum: '', admins: [], adminsArcv: [], address: '', website: '', logo: {key: '', url: ''}, empSize: ''};
  newAdmin = { name:'', email:'' };
  companyInfoMsg: String;
  logoMsg: String;
  adminManageMsg: String;
  adminToDeactivate = '';
  adminToRestore = '';
  deactivateModalActions = new EventEmitter<string|MaterializeAction>();
  restoreModalActions = new EventEmitter<string|MaterializeAction>();

  imgName: String;
  imgData: any;
  cropperSettings :CropperSettings;
  croppedWidth: Number;
  croppedHeight: Number;

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  constructor(
      private companyAPIService: CompanyApiService,
      private route: ActivatedRoute
    ) {
    this.localUser = JSON.parse(localStorage.getItem('user')); 
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
    this.urlCmpId = this.route.snapshot.paramMap.get('id');
    this.loadPageDetails(this.urlCmpId);
  }

  loadPageDetails(urlId){
    this.companyAPIService.getCmpInfo(urlId).subscribe(resp => {
      if(!resp.success) return false;
      if(!resp.companyData.adminsArcv){
        resp.companyData.adminsArcv = [];
      }
      let dateObj = new Date(resp.companyData.est);
      let options = { year: 'numeric', month: 'long', day:'numeric' };
      resp.companyData.est = dateObj.toLocaleDateString('EN-US', options);
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
      resp.success ? this.companyInfoMsg = "企業情報が更新されました！" : this.companyInfoMsg = "エラーが発生しました。時間をおいてから再度お試しください。";
      toast(this.companyInfoMsg, 3000);
    });
  }

  adminInfoSubmit(validForm: Boolean){
    if(!validForm) return false;
    this.editingAdmin = false;
    this.companyAPIService.addAdmin(this.newAdmin, this.urlCmpId).subscribe(resp =>{
      resp.success ? this.companyInfoMsg = "新しい管理者を追加しました。" : this.companyInfoMsg = "エラーが発生しました。時間をおいてから再度お試しください。";
      toast(this.companyInfoMsg, 3000);
    });
  }

  onLogoUploadClick(){
    let formData:FormData = new FormData();
    let blob = this.convertToBlob( this.imgData.image);
    formData.append('companyId', this.companyDetails._id);
    formData.append('companyLogo', blob);
    this.companyAPIService.updateLogo(formData).subscribe(resp =>{
      if (resp.success){
        this.companyDetails.logo.url =  resp.newLink;
        this.logoMsg = "会社ロゴをアップロードしました。"
      }
      else {
        this.logoMsg = "エラーが発生しました。時間をおいてから再度お試しください。"
      }
      toast(this.logoMsg, 3000);
    });
  }

  onDeactivateAdminClick(adminId){
    this.adminToDeactivate = adminId;
    this.deactivateModalActions.emit({ action:'modal', params:['open'] });
  }

  onRestoreAdminClick(adminId){
    this.adminToRestore = adminId;
    this.restoreModalActions.emit({ action:'modal', params:['open'] });
  }

  deactivateAdmin(){
    this.companyAPIService.deactivateAdmin(this.companyDetails._id, this.adminToDeactivate).subscribe( resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('エラーが発生しました。コンソールから詳細を確認してください。', 3000); 
      }
      toast('管理者権限を無効化しました。', 3000);
      if(!resp.companyData.adminsArcv){
        resp.companyData.adminsArcv = [];
      }
      let dateObj = new Date(resp.companyData.est);
      let options = { year: 'numeric', month: 'long', day:'numeric' };
      resp.companyData.est = dateObj.toLocaleDateString('EN-US', options);
      this.companyDetails = resp.companyData;
      
    });
  }

  restoreAdmin(){
    this.companyAPIService.restoreAdmin(this.companyDetails._id, this.adminToRestore).subscribe( resp => {
      if(!resp.success) {
        console.log(resp.error);
        return toast('エラーが発生しました。コンソールから詳細を確認してください。', 3000); 
      }
      toast('管理者権限を再度有効化しました。', 3000);
      if(!resp.companyData.adminsArcv){
        resp.companyData.adminsArcv = [];
      }
      let dateObj = new Date(resp.companyData.est);
      let options = { year: 'numeric', month: 'long', day:'numeric' };
      resp.companyData.est = dateObj.toLocaleDateString('EN-US', options);
      this.companyDetails = resp.companyData;
    });
  }
}
