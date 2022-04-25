import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectLevelReportComponent } from './subject-level-report.component';

describe('SubjectLevelReportComponent', () => {
  let component: SubjectLevelReportComponent;
  let fixture: ComponentFixture<SubjectLevelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectLevelReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectLevelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
