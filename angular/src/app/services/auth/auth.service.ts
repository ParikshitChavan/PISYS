import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from "angular2-jwt";
import { Subject }    from 'rxjs/Subject';
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {
  loggedInSrc = new Subject<any>();
  loggedIn$ = this.loggedInSrc.asObservable();
  authToken: any;
  user: any;
 
  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post('user/register', user, {headers: headers}).map(res => res.json());
  }

  login(user){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post('user/authenticate', user, {headers: headers}).map(res => res.json());
  }

  loginSuccess(data){
    this.saveToken(data.token);
    this.saveHeaderUserInfo(data.userData);
    this.loadHeaderUserInfo();
  }

  saveHeaderUserInfo(userData){
    localStorage.setItem('user', JSON.stringify(userData));
    this.user = userData;
  }

  loadHeaderUserInfo(){
    this.user =  JSON.parse(localStorage.getItem('user'));
    let headerData = {name: this.user.name, DPUrl: this.user.DPUrl};
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
    return this.http.get('user/userInfo', {headers: headers}).map(res => res.json());
  }

  updateUserInfo(userInfo){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.post('user/updateUserInfo', userInfo, {headers: headers}).map(res => res.json());
  }

  updateDisplayPic(uploadData){
    this.loadToken();
    let headers = new Headers;
    headers.append('x-access-token', this.authToken);
    return this.http.post('user/updateDisplayPic', uploadData, {headers: headers}).map(res => res.json());
  }

  initPassword(data){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post('user/initPassword', data, {headers: headers}).map(res => res.json());
  }

  resetPassword(data){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post('user/resetPassword', data, {headers: headers}).map(res => res.json());
  }

  updatePassword(data){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post('user/updatePassword', data, {headers: headers}).map(res => res.json());
  }

}
//http://localhost:3000/ for local testing