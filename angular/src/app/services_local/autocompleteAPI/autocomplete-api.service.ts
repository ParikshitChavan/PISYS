import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import "rxjs/add/operator/map";


@Injectable()
export class AutocompleteApiService {
  authToken: any;
  constructor(private http: Http) { }

  loadToken(){
    this.authToken = localStorage.getItem('authToken');
  }  

  getCompanySuggestions(searchTerm: string){
    this.loadToken();
    let data = {searchTerm : searchTerm}
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/company/suggestions', data, {headers: headers}).map(res => res.json());
  }
  
  getCandidateSuggestions(searchTerm:string){
    this.loadToken();
    let data = {searchTerm : searchTerm}
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/user/suggestions', data, {headers: headers}).map(res => res.json());
  }
}
//http://localhost:3000/ for local testing