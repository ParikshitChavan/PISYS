import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuicaComponent } from './suica.component';

describe('SuicaComponent', () => {
  let component: SuicaComponent;
  let fixture: ComponentFixture<SuicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
