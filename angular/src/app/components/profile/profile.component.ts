import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: Object;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(resp => {
      if(!resp.success) return false;
      this.user = resp.profileData;
    }, err => {
      console.log(err);
      return false;
    });
  }

}
