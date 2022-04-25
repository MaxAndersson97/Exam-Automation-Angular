import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentMarksManuallyComponent } from './add-student-marks-manually.component';

describe('AddStudentMarksManuallyComponent', () => {
  let component: AddStudentMarksManuallyComponent;
  let fixture: ComponentFixture<AddStudentMarksManuallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentMarksManuallyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentMarksManuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
