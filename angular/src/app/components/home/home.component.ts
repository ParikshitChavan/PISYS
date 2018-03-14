import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: String;
  email: String;
  DOB: Date;
  password: String;
  phNum: String;

  constructor() { }

  ngOnInit() {
  }

  registerUser(){
    const user = {
      name: this.name,
      email: this.email,
      DOB: this.DOB,
      password: this.password,
      phNum: this.phNum
    }
    
  }
}
