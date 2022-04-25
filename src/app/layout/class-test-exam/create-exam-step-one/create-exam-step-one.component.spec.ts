import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamStepOneComponent } from './create-exam-step-one.component';

describe('CreateExamStepOneComponent', () => {
  let component: CreateExamStepOneComponent;
  let fixture: ComponentFixture<CreateExamStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExamStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExamStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
