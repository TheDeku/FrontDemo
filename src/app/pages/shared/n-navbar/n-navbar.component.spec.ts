import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NNavbarComponent } from './n-navbar.component';

describe('NNavbarComponent', () => {
  let component: NNavbarComponent;
  let fixture: ComponentFixture<NNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
