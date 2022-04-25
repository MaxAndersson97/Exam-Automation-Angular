import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamGroupDashboardComponent } from './exam-group-dashboard.component';

describe('ExamGroupDashboardComponent', () => {
  let component: ExamGroupDashboardComponent;
  let fixture: ComponentFixture<ExamGroupDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamGroupDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamGroupDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
