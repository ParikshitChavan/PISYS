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

  getCandidates(id){
    const data = {
      companyId: id
    }
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'company/info', data, {headers: headers}).map(res => res.json());
  }

  createSeason(){}
  deleteSeason(){}
  addCandidate(){}

}
