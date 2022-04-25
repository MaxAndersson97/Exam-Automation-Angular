import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentParentComponent } from './add-student-parent.component';

describe('ParentComponent', () => {
  let component: AddStudentParentComponent;
  let fixture: ComponentFixture<AddStudentParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
