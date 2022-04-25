import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTestExamChepterSelectionComponent } from './class-test-exam-chepter-selection.component';

describe('ClassTestExamChepterSelectionComponent', () => {
  let component: ClassTestExamChepterSelectionComponent;
  let fixture: ComponentFixture<ClassTestExamChepterSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTestExamChepterSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTestExamChepterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
