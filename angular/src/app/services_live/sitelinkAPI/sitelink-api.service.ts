import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class SitelinkApiService {
  authToken: any;

  constructor(private http:Http) { }

  loadToken(){
    this.authToken = localStorage.getItem('authToken');
  }

  validateAccInit(data){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post('user/validateSitelink', data, {headers: headers}).map(res => res.json());
  }

  validatePassReset(data){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post('user/validateSitelink', data, {headers: headers}).map(res => res.json());
  }
                                                                 
  validateEmail(data){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('user/validateSitelink', data, {headers: headers}).map(res => res.json());
  }
}
//http://localhost:3000/ for local testing