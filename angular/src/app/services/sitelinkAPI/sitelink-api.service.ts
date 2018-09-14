import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import "rxjs/add/operator/map";

import { environment } from "../../../environments/environment";

@Injectable()
export class SitelinkApiService {
  authToken: any;
  appUrl: string= '';

  constructor(private http:Http) {
    this.appUrl = environment.appUrl
   }

  loadToken(){
    this.authToken = localStorage.getItem('authToken');
  }

  validateAccInit(data){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post(this.appUrl + 'user/validateSitelink', data, {headers: headers}).map(res => res.json());
  }

  validatePassReset(data){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post(this.appUrl + 'user/validateSitelink', data, {headers: headers}).map(res => res.json());
  }
                                                                 
  validateEmail(data){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.appUrl + 'user/validateSitelink', data, {headers: headers}).map(res => res.json());
  }
}