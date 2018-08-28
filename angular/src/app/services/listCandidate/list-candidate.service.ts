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

  getCandidates(){}
  createSeason(){}
  deleteSeason(){}
  addCandidate(){}

}
