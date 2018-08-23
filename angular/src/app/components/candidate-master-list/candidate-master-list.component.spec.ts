import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateMasterListComponent } from './candidate-master-list.component';

describe('CandidateMasterListComponent', () => {
  let component: CandidateMasterListComponent;
  let fixture: ComponentFixture<CandidateMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
