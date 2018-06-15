import { Component, OnInit, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  decodedToken: any;
  userAccess: any;
  user ={
    name: "",
    DPUrl: ""
  }
  dropdownActions = new EventEmitter<string|MaterializeAction>();
  dropdownParams = [{ inDuration: 300, outDuration: 225, belowOrigin: true}];

  constructor(public authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.loggedIn$.subscribe((headerData) =>{
      this.user = {name: headerData.name, DPUrl: headerData.DPUrl};
      this.userAccess = headerData.userAccess;
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
