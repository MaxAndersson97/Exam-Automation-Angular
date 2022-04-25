import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPerformanceComponent } from './subject-performance.component';

describe('SubjectPerformanceComponent', () => {
  let component: SubjectPerformanceComponent;
  let fixture: ComponentFixture<SubjectPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
