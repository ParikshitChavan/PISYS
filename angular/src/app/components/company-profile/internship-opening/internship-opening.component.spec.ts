import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipOpeningComponent } from './internship-opening.component';

describe('InternshipOpeningComponent', () => {
  let component: InternshipOpeningComponent;
  let fixture: ComponentFixture<InternshipOpeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipOpeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
