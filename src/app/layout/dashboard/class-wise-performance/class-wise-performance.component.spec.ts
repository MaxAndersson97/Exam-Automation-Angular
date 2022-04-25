import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassWisePerformanceComponent } from './class-wise-performance.component';

describe('ClassWisePerformanceComponent', () => {
  let component: ClassWisePerformanceComponent;
  let fixture: ComponentFixture<ClassWisePerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassWisePerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassWisePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
