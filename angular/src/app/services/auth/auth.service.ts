import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {

  authToken: any;
 
  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post('http://localhost:3000/user/register', user, {headers: headers}).map(res => res.json());
  }

  login(user){
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    return this.http.post('http://localhost:3000/user/authenticate', user, {headers: headers}).map(res => res.json());
  }

  saveToken(token){
    localStorage.setItem('authToken', token);
    this.authToken = token;
  }

  loadToken(){
    this.authToken = localStorage.getItem('authToken');
  }

  destroyToken(){
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  //User Protected Routes request below 
  getProfile(){
    this.loadToken();
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.authToken);
    return this.http.get('http://localhost:3000/user/profile', {headers: headers}).map(res => res.json());
  }
}


