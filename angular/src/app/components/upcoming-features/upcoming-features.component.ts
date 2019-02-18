import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from 'angular2-materialize';

@Component({
  selector: 'app-upcoming-features',
  templateUrl: './upcoming-features.component.html',
  styleUrls: ['./upcoming-features.component.scss']
})
export class UpcomingFeaturesComponent implements OnInit {

  crslActions = new EventEmitter <string | MaterializeAction>();

  constructor() { }

  ngOnInit() {
  }

  nextSlide(){
    this.crslActions.emit({ action: "carousel", params: ['next'] });
  }
}
