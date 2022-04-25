import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetDashboardComponent } from './worksheet-dashboard.component';

describe('WorksheetDashboardComponent', () => {
  let component: WorksheetDashboardComponent;
  let fixture: ComponentFixture<WorksheetDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
