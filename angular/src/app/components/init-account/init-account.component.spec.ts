import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitAccountComponent } from './init-account.component';

describe('InitAccountComponent', () => {
  let component: InitAccountComponent;
  let fixture: ComponentFixture<InitAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
