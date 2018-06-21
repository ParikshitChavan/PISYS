import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SitelinkApiService } from '../../services/sitelinkAPI/sitelink-api.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  validLink: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private sitelinkAPIService: SitelinkApiService,
    private router:Router) { }

  ngOnInit() {
    let data = {id: this.activatedRoute.snapshot.params.token};
    this.sitelinkAPIService.validateEmail(data).subscribe( resp =>{
      if(resp.success){
        this.validLink = true;
      } 
      else toast('Some error occurred. Please try again later.',3000);
    });
  }

}
