import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTestExamBloomdifficultyComponent } from './class-test-exam-bloomdifficulty.component';

describe('ClassTestExamBloomdifficultyComponent', () => {
  let component: ClassTestExamBloomdifficultyComponent;
  let fixture: ComponentFixture<ClassTestExamBloomdifficultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTestExamBloomdifficultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTestExamBloomdifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
