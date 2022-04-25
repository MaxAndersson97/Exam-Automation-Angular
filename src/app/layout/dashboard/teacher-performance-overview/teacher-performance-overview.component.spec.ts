import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPerformanceOverviewComponent } from './teacher-performance-overview.component';

describe('TeacherPerformanceOverviewComponent', () => {
  let component: TeacherPerformanceOverviewComponent;
  let fixture: ComponentFixture<TeacherPerformanceOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPerformanceOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPerformanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
