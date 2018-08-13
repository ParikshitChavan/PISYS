import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningListingComponent } from './opening-listing.component';

describe('OpeningListingComponent', () => {
  let component: OpeningListingComponent;
  let fixture: ComponentFixture<OpeningListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
