import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTestExamSummarryComponent } from './class-test-exam-summarry.component';

describe('ClassTestExamSummarryComponent', () => {
  let component: ClassTestExamSummarryComponent;
  let fixture: ComponentFixture<ClassTestExamSummarryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTestExamSummarryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTestExamSummarryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
