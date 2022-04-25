import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTestExamComponent } from './class-test-exam.component';

describe('ClassTestExamComponent', () => {
  let component: ClassTestExamComponent;
  let fixture: ComponentFixture<ClassTestExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTestExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTestExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
