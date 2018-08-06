import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from "angular2-jwt";
import "rxjs/add/operator/map";

@Injectable()
export class CompanyApiService {
  authToken: any;
  constructor(private http: Http) { }

  loadToken(){
    this.authToken = localStorage.getItem('authToken');
  }

  //User Protected Routes request below 
  getCmpInfo(){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.get('http://localhost:3000/company/info', {headers: headers}).map(res => res.json());
  }

  getCmpNames(){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.get('http://localhost:3000/company/companyNames', {headers: headers}).map(res => res.json());
  }

  updateCmpInfo(cmpInfo){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/company/updateInfo', cmpInfo, {headers: headers}).map(res => res.json());
  }

  updateLogo(uploadData){
    this.loadToken();
    let headers = new Headers;
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/company/updateLogo', uploadData, {headers: headers}).map(res => res.json());
  }

  addAdmin(newAdmin){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/company/registerAdmin', newAdmin, {headers: headers}).map(res => res.json());
  }

  createCompany(newCmp){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/company/register', newCmp, {headers: headers}).map(res => res.json());
  }

  getRecruitmentPage(companyId){
    this.loadToken();
    let headers = new Headers;
    let data = {companyId: companyId}
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/company/getRecruitmentPage', data, {headers: headers}).map(res => res.json());
  }

  getInternshipOpenings(companyId){
    this.loadToken();
    let headers = new Headers;
    let data = {companyId: companyId}
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/company/getInternshipOpenings', data, {headers: headers}).map(res => res.json());
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
    return this.http.post('http://localhost:3000/company/getOpeningDetails', data, {headers: headers}).map(res => res.json());
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
    return this.http.post('http://localhost:3000/company/upsertOpening', data, {headers: headers}).map(res => res.json());
  }
}
//http://localhost:3000/ for local testing