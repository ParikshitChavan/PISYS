import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { environment } from "../../../environments/environment";

@Injectable()
export class CompanyApiService {
  authToken: any;
  appUrl : string ='';
  constructor(private http: Http) {
    this.appUrl = environment.appUrl;
   }

  loadToken(){
    this.authToken = localStorage.getItem('authToken');
  }

  //User Protected Routes request below 
  getCmpInfo(id){
    const data = {
      companyId: id
    }
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/info', data, {headers: headers}).map(res => res.json());
  }

  getCmpNames(){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.get(this.appUrl + 'company/companyNames', {headers: headers}).map(res => res.json());
  }

  updateCmpInfo(cmpInfo){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/updateInfo', cmpInfo, {headers: headers}).map(res => res.json());
  }

  updateLogo(uploadData){
    this.loadToken();
    let headers = new Headers;
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/updateLogo', uploadData, {headers: headers}).map(res => res.json());
  }

  addAdmin(newAdmin, cmpId){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    newAdmin['companyId'] = cmpId;
    return this.http.post(this.appUrl + 'company/registerAdmin', newAdmin, {headers: headers}).map(res => res.json());
  }

  createCompany(newCmp){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/register', newCmp, {headers: headers}).map(res => res.json());
  }

  getRecruitmentPage(companyId){
    this.loadToken();
    let headers = new Headers;
    let data = {companyId: companyId}
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/getRecruitmentPage', data, {headers: headers}).map(res => res.json());
  }

  
  getInternshipOpenings(companyId){
    this.loadToken();
    let headers = new Headers;
    let data = {companyId: companyId}
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/getInternshipOpenings', data, {headers: headers}).map(res => res.json());
  }

  getOpeningDetails(companyId, openingId){
    this.loadToken();
    let data = {
      companyId: companyId,
      openingId: openingId
    }
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/getOpeningDetails', data, {headers: headers}).map(res => res.json());
  }

  upsertOpening(companyId, action, newOpening){
    this.loadToken();
    let data = {
      companyId: companyId,
      action: action,
      opening: newOpening
    }
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/upsertOpening', data, {headers: headers}).map(res => res.json());
  }

  getAllPublicOpenings(){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.get(this.appUrl + 'company/getAllPublicOpenings', {headers: headers}).map(res => res.json());
  }

  addOpeningLike(companyId, openingId){
    this.loadToken();
    let data = {
      companyId: companyId,
      openingId: openingId
    }
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/addOpeningLike', data, {headers: headers}).map(res => res.json());
  }

  removeOpeningLike(companyId, openingId){
    this.loadToken();
    let data = {
      companyId: companyId,
      openingId: openingId
    }
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/removeOpeningLike', data, {headers: headers}).map(res => res.json());
  }

  updateAbtUs(companyId, abtUs){
    this.loadToken();
    let data = {
      companyId: companyId,
      aboutUs: abtUs
    }
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'company/updateAboutUs', data, {headers: headers}).map(res => res.json());
  }

}