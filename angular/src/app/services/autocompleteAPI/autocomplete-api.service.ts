import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { environment } from "../../../environments/environment";

@Injectable()
export class AutocompleteApiService {
  authToken: any;
  apiUrl: string = '';
  constructor(private http: Http) { 
    this.apiUrl = environment.appUrl;
  }

  loadToken(){
    this.authToken = localStorage.getItem('authToken');
  }  

  getCompanySuggestions(searchTerm: string){
    this.loadToken();
    let data = {searchTerm : searchTerm}
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'company/suggestions', data, {headers: headers}).map(res => res.json());
  }
  
  getCandidateSuggestions(searchTerm:string){
    this.loadToken();
    let data = {searchTerm : searchTerm}
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'user/suggestions', data, {headers: headers}).map(res => res.json());
  }
}