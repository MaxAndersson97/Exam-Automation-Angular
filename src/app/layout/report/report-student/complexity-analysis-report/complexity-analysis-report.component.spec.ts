import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexityAnalysisReportComponent } from './complexity-analysis-report.component';

describe('ComplexityAnalysisReportComponent', () => {
  let component: ComplexityAnalysisReportComponent;
  let fixture: ComponentFixture<ComplexityAnalysisReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexityAnalysisReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexityAnalysisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
