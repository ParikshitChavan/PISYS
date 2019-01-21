import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TAndCComponent } from './t-and-c.component';

describe('TAndCComponent', () => {
  let component: TAndCComponent;
  let fixture: ComponentFixture<TAndCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TAndCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TAndCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
