import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTestExamAnswersheetComponent } from './class-test-exam-answersheet.component';

describe('ClassTestExamAnswersheetComponent', () => {
  let component: ClassTestExamAnswersheetComponent;
  let fixture: ComponentFixture<ClassTestExamAnswersheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTestExamAnswersheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTestExamAnswersheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
