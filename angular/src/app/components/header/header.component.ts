import { Component, OnInit, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {MaterializeAction} from 'angular2-materialize';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  decodedToken: any;
  userAccess: any;
  user ={
    name: "",
    DPUrl: ""
  }
  dropdownActions = new EventEmitter<string|MaterializeAction>();
  dropdownParams = [{ inDuration: 300, outDuration: 225, belowOrigin: true}];

  constructor(public authService: AuthService, private router:Router) {
    let token = localStorage.getItem('authToken');
    if(token){
      this.decodedToken = this.jwtHelper.decodeToken(token);
      this.userAccess = this.decodedToken.access;
    }
   }

  ngOnInit() {
    this.authService.loggedIn$.subscribe((headerData) =>{
      this.user = headerData;
      setTimeout(()=>{
        this.dropdownActions.emit("dropdown");
      });
    });

    if(this.authService.isLoggedIn()){
      this.authService.loadHeaderUserInfo();
    }
  }

  logout(){
    this.authService.destroyToken();
    this.authService.destroyUserInfo();
    this.router.navigate(['/']);
  }
}
