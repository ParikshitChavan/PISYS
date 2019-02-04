import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-invite-history',
  templateUrl: './invite-history.component.html',
  styleUrls: ['./invite-history.component.scss']
})
export class InviteHistoryComponent implements OnInit {
  stars : number = 0;
  invites = [];
  newInvite : string = '';


  constructor(private activatedRoute: ActivatedRoute,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.authService.getInvitesHistory(id).subscribe( resp =>{
      if(resp.success){
        this.stars = resp.stars;
        this.invites = resp.invites;   
      } 
      else toast('Some error occurred. Please try again later.',3000);
    });
  }

  inviteCandiSubmit(formValid: boolean){
    if(!formValid) return false;
    this.authService.inviteNewUser(this.newInvite).subscribe( resp =>{
      if(resp.success){
        this.invites = resp.invites;   
      } 
      else toast('Some error occurred. Please try again later.',3000);
    });
  }
}
