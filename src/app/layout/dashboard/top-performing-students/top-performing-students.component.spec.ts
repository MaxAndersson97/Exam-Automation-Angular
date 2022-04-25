import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPerformingStudentsComponent } from './top-performing-students.component';

describe('TopPerformingStudentsComponent', () => {
  let component: TopPerformingStudentsComponent;
  let fixture: ComponentFixture<TopPerformingStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPerformingStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPerformingStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
