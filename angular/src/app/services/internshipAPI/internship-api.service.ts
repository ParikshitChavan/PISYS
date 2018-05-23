import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class InternshipApiService {
  authToken: any;
  constructor(private http: Http) { }

  loadToken(){
    this.authToken = localStorage.getItem('authToken');
  }

  getIntnshipDetails(id:string){
    this.loadToken();
    let data = {id : id}
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/info', data, {headers: headers}).map(res => res.json());
  }

  getInternships(year){
    this.loadToken();
    let headers = new Headers;
    let data = {year: year};
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/yearInternships', data, {headers: headers}).map(res => res.json());
  }

  createInternship(newIntnshp){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/initInternship', newIntnshp, {headers: headers}).map(res => res.json());
  }

  updateBasicInfo(intnshpData){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/upsertBasicInfo', intnshpData, {headers: headers}).map(res => res.json());
  }

  loadWeeklyReports(intnshpId:string){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/upsertBasicInfo', intnshpId, {headers: headers}).map(res => res.json());
  }

  upsertWeeklyReport(intnshpId, data){
    data['intnshpId'] = intnshpId;
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/updateCandidateWeeklyReport', data, {headers: headers}).map(res => res.json());
  }

  upsertComment(intnshpId, wReptIndex, data){
    data['intnshpId'] = intnshpId;
    data['wReptIndex'] = wReptIndex;
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/updateWeeklyReportComment', data, {headers: headers}).map(res => res.json());
  }

  deleteComment(intnshpId, wReptIndex, cmtIndex){
    let data = {intnshpId: intnshpId, wReptIndex: wReptIndex, cmtIndex: cmtIndex}; 
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/deleteComment', data, {headers: headers}).map(res => res.json());
  }

  loadSuicaDetails(intnshpId){
    let data = {intnshpId: intnshpId}
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/loadSuicaDetails', data, {headers: headers}).map(res => res.json());
  }

  upsertSuicaDetails(intnshpId, suica){
    let data = {intnshpId: intnshpId, suica: suica};
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/updateSuicaDetails', data, {headers: headers}).map(res => res.json());
  }

  loadWiFiDetails(intnshpId){
    let data = {intnshpId: intnshpId}
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/loadWifiDetails', data, {headers: headers}).map(res => res.json());
  }

  upsertWiFiDetails(intnshpId, wifi){
    let data = {intnshpId: intnshpId, wifi: wifi};
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/updateWIfiDetails', data, {headers: headers}).map(res => res.json());
  }

  loadStipends(intnshpId){
    let data = {intnshpId: intnshpId}
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/getPayments', data, {headers: headers}).map(res => res.json());
  }

  upsertStipend(intnshpId, payments){
    let data = {intnshpId: intnshpId, payments: payments};
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/updatePayment', data, {headers: headers}).map(res => res.json());
  }

  deleteStipend(intnshpId, stipendIndex){
    let data = {intnshpId: intnshpId, stipendIndex: stipendIndex};
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/deletePayment', data, {headers: headers}).map(res => res.json());
  }

  loadAccommodationDetails(intnshpId){
    let data = {intnshpId: intnshpId}
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/getAccommodationDetails', data, {headers: headers}).map(res => res.json());
  }

  upsertAccommodationDetails(intnshpId, accommodation){
    let data = {intnshpId: intnshpId, accommodation: accommodation};
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('http://localhost:3000/internship/updateAccommodationDetails', data, {headers: headers}).map(res => res.json());
  }

  isWLMember(){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.get('http://localhost:3000/user/isWLMember', {headers: headers}).map(res => res.json());
  }
}
