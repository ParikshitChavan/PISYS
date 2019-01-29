import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from "angular2-jwt";
import { Subject }    from 'rxjs/Subject';
import { JwtHelper } from 'angular2-jwt';
import "rxjs/add/operator/map";

import { environment } from "../../../environments/environment";

@Injectable()
export class AuthService {
  loggedInSrc = new Subject<any>();
  loggedIn$ = this.loggedInSrc.asObservable();
  public authToken: any;
  user: any;
  jwtHelper: JwtHelper = new JwtHelper();
  decodedToken: any;
  apiUrl : string = '';
  constructor(private http: Http) {
    this.apiUrl = environment.appUrl
   }

  registerUser(user){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post( this.apiUrl + 'user/register', user, {headers: headers}).map(res => res.json());
  }

  forgotPasswordInit(email){
    let data = { email: email };
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post(this.apiUrl + 'user/requestPasswordReset', data, {headers: headers}).map(res =>{
      return res.json()});
  }

  userLogin(user){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    const url = this.apiUrl + 'user/authenticateCandidate';
    return this.http.post(url, user, {headers: headers}).map(res => res.json());
  }

  adminLogin(user){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    const url = this.apiUrl + 'user/authenticateAdmin';
    return this.http.post(url, user, {headers: headers}).map(res => res.json());
  }

  loginSuccess(data){
    //console.log('time when token saved', new Date());
    this.saveToken(data.token);
    this.saveUserInfo(data.userData);
    this.loadHeaderUserInfo();
  }

  saveUserInfo(userData){
    localStorage.setItem('user', JSON.stringify(userData));
    this.user = userData;
  }

  loadHeaderUserInfo(){
    this.user =  JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('authToken');
    if(token){
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
    let headerData = {name: this.user.name, DPUrl: this.user.DPUrl, userAccess: this.decodedToken.access, userId :this.decodedToken._id };
    this.loggedInSrc.next(headerData);
  }

  saveToken(token){
    localStorage.setItem('authToken', token);
    this.authToken = token;
  }

  loadToken(){
    this.authToken = localStorage.getItem('authToken');
  }

  isLoggedIn(){
    return tokenNotExpired("authToken");
  }

  destroyToken(){
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  destroyUserInfo(){
    this.authToken = null;
    localStorage.removeItem('user');
  }

  //User Protected Routes request below 
  getUserInfo(){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.get(this.apiUrl + 'user/userInfo', {headers: headers}).map(res => res.json());
  }

  updateUserInfo(userInfo){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'user/updateUserInfo', userInfo, {headers: headers}).map(res => res.json());
  }

  updateDisplayPic(uploadData){
    this.loadToken();
    let headers = new Headers;
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'user/updateDisplayPic', uploadData, {headers: headers}).map(res => res.json());
  }

  initPassword(data){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post(this.apiUrl + 'user/initPassword', data, {headers: headers}).map(res => res.json());
  }

  resetPassword(data){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post(this.apiUrl + 'user/resetPassword', data, {headers: headers}).map(res => res.json());
  }

  updatePassword(data){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post(this.apiUrl + 'user/updatePassword', data, {headers: headers}).map(res => res.json());
  }

  deleteUser(userId){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    const data = {userId: userId};
    return this.http.post(this.apiUrl + 'user/delete', data, {headers: headers}).map(res => res.json());
  }

}