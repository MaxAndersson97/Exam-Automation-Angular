import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignExamDashobardComponent } from './assign-exam-dashobard.component';

describe('AssignExamDashobardComponent', () => {
  let component: AssignExamDashobardComponent;
  let fixture: ComponentFixture<AssignExamDashobardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignExamDashobardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignExamDashobardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
