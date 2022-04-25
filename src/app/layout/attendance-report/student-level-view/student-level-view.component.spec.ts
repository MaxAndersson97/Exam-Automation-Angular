import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLevelViewComponent } from './student-level-view.component';

describe('StudentLevelViewComponent', () => {
  let component: StudentLevelViewComponent;
  let fixture: ComponentFixture<StudentLevelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLevelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLevelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
