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
    return this.http.get('http://localhost:3000/comapny/info', {headers: headers}).map(res => res.json());
  }

  getCmpNames(){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.get('http://localhost:3000/comapny/companyNames', {headers: headers}).map(res => res.json());
  }

  updateCmpInfo(cmpInfo){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/comapny/updateInfo', cmpInfo, {headers: headers}).map(res => res.json());
  }

  updateLogo(uploadData){
    this.loadToken();
    let headers = new Headers;
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/company/updatelogo', uploadData, {headers: headers}).map(res => res.json());
  }

  addAdmin(newAdmin){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/comapny/registerAdmin', newAdmin, {headers: headers}).map(res => res.json());
  }

  createCompany(newCmp){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/comapny/register', newCmp, {headers: headers}).map(res => res.json());
  }

}
