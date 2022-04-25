import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTestExamDashboardComponent } from './class-test-exam-dashboard.component';

describe('ClassTestExamDashboardComponent', () => {
  let component: ClassTestExamDashboardComponent;
  let fixture: ComponentFixture<ClassTestExamDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTestExamDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTestExamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
