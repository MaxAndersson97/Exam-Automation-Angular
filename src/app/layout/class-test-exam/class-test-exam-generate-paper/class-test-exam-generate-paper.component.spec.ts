import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTestExamGeneratePaperComponent } from './class-test-exam-generate-paper.component';

describe('ClassTestExamGeneratePaperComponent', () => {
  let component: ClassTestExamGeneratePaperComponent;
  let fixture: ComponentFixture<ClassTestExamGeneratePaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTestExamGeneratePaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTestExamGeneratePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
