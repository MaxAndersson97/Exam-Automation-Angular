import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterStudentPerformanceDetailsComponent } from './chapter-student-performance-details.component';

describe('ChapterStudentPerformanceDetailsComponent', () => {
  let component: ChapterStudentPerformanceDetailsComponent;
  let fixture: ComponentFixture<ChapterStudentPerformanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterStudentPerformanceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterStudentPerformanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
