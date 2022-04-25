import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningCurveReportComponent } from './learning-curve-report.component';

describe('LearningCurveReportComponent', () => {
  let component: LearningCurveReportComponent;
  let fixture: ComponentFixture<LearningCurveReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningCurveReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningCurveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
