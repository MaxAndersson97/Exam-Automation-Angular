import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTestExamTemplateSelectionComponent } from './class-test-exam-template-selection.component';

describe('ClassTestExamTemplateSelectionComponent', () => {
  let component: ClassTestExamTemplateSelectionComponent;
  let fixture: ComponentFixture<ClassTestExamTemplateSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTestExamTemplateSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTestExamTemplateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
