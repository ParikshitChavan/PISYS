import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningsListComponent } from './openings-list.component';

describe('OpeningsListComponent', () => {
  let component: OpeningsListComponent;
  let fixture: ComponentFixture<OpeningsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
