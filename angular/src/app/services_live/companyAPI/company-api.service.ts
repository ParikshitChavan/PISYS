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
    return this.http.get('company/info', {headers: headers}).map(res => res.json());
  }

  getCmpNames(){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.get('company/companyNames', {headers: headers}).map(res => res.json());
  }

  updateCmpInfo(cmpInfo){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('company/updateInfo', cmpInfo, {headers: headers}).map(res => res.json());
  }

  updateLogo(uploadData){
    this.loadToken();
    let headers = new Headers;
    headers.append('x-access-token', this.authToken);
    return this.http.post('company/updateLogo', uploadData, {headers: headers}).map(res => res.json());
  }

  addAdmin(newAdmin){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('company/registerAdmin', newAdmin, {headers: headers}).map(res => res.json());
  }

  createCompany(newCmp){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('company/register', newCmp, {headers: headers}).map(res => res.json());
  }
}
//http://localhost:3000/ for local testing