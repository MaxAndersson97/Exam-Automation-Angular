import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcsdashboardComponent } from './ccsdashboard.component';

describe('CcsdashboardComponent', () => {
  let component: CcsdashboardComponent;
  let fixture: ComponentFixture<CcsdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcsdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
