import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }                 from '@angular/router';

import {MaterializeAction} from 'angular2-materialize';
import { EventEmitter } from '@angular/core';

import { CvBuilderService } from '../../services/cvbuilder/cvbuilder.service'

@Component({
  selector: 'app-cvbuilder',
  templateUrl: './cvbuilder.component.html',
  styleUrls: ['./cvbuilder.component.css']
})
export class CvBuilderComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  public _actionProgress: string = 'action'; // form to add new entry into one of the subsection.  action to show a message like failed, invalid.
  userAccess : 0;
  userId : string = '';
  loading: boolean = false;

  formModalConfig = {
    type : 'action',
    title: ''
  }
  modalConfig = {
    type : 'invalid',
    title: '',
    message: '',
    locked : false,
    reasons: []
  }

  constructor(private cvBuilderService: CvBuilderService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe( (params:Params)=>{
      this.userId = params['id'];
      this.cvBuilderService.loadCv(this.userId);
     })
  }


  /**
   * modal methods to close and open
   * @memberof CvBuilderComponent
   */
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }

  /**
   * @memberof CvBuilderComponent
   */
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
