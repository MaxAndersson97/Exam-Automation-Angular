import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPerformanceDetailsComponent } from './class-performance-details.component';

describe('ClassPerformanceDetailsComponent', () => {
  let component: ClassPerformanceDetailsComponent;
  let fixture: ComponentFixture<ClassPerformanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassPerformanceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassPerformanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
