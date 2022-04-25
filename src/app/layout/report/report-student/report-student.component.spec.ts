import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStudentComponent } from './report-student.component';

describe('ReportStudentComponent', () => {
  let component: ReportStudentComponent;
  let fixture: ComponentFixture<ReportStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
