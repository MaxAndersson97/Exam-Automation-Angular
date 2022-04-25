import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLevelViewsComponent } from './student-level-views.component';

describe('StudentLevelViewsComponent', () => {
  let component: StudentLevelViewsComponent;
  let fixture: ComponentFixture<StudentLevelViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLevelViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLevelViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
