import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimentsComponent } from './requeriments.component';

describe('RequerimentsComponent', () => {
  let component: RequerimentsComponent;
  let fixture: ComponentFixture<RequerimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequerimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
