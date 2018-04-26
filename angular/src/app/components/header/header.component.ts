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
  user ={
    name: "",
    DPUrl: ""
  }
  dropdownActions = new EventEmitter<string|MaterializeAction>();
  dropdownActions2 = new EventEmitter<string|MaterializeAction>();
  dropdownParams = [{ inDuration: 300, outDuration: 225, belowOrigin: true}];

  constructor(public authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.loggedIn$.subscribe((headerData) =>{
      this.user = headerData;
      setTimeout(()=>{
        this.dropdownActions.emit("dropdown");
        this.dropdownActions2.emit("dropdown");
      });
    });

    if(this.authService.isLoggedIn()){
      this.authService.loadHeaderUserInfo();
    }
  }

  logout(){
    this.authService.destroyToken();
    this.router.navigate(['/']);
  }
}
