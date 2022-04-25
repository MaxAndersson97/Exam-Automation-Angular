import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExamComponent } from './report-exam.component';

describe('ReportExamComponent', () => {
  let component: ReportExamComponent;
  let fixture: ComponentFixture<ReportExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
