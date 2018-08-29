import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from "../../../environments/environment";

@Injectable()
export class ListCandidateService {
  authToken: any;
  apiUrl: string = '';

  constructor(private http: Http) {
    this.apiUrl = environment.appUrl;
   }
  
  loadToken(){
    this.authToken = localStorage.getItem('authToken');
  }

  getCandidates(yr){
    const data = {
      season: yr
    }
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'listCandidate/getListOfYear', data, {headers: headers}).map(res => res.json());
  }

  createSeason(yr){
    const data = {
      season: yr
    }
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'listCandidate/createSeason', data, {headers: headers}).map(res => res.json());
  }

  deleteSeason(yr){
    const data = {
      season: yr
    }
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'listCandidate/deleteSeason', data, {headers: headers}).map(res => res.json());
  }

  addCandidate(candidateId){
    const data = {
      season: candidateId
    }
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'listCandidate/addCandidate', data, {headers: headers}).map(res => res.json());
  }

  removeCandidate(candidateId){
    const data = {
      season: candidateId
    }
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'listCandidate/removeCandidate', data, {headers: headers}).map(res => res.json());
  }

  updateCandidate(candidate){
    const data = {
      candidate: candidate
    }
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'listCandidate/updateCandidate', data, {headers: headers}).map(res => res.json());
  }
}
