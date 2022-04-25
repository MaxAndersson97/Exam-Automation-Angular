import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedStudentMarksComponent } from './imported-student-marks.component';

describe('ImportedStudentMarksComponent', () => {
  let component: ImportedStudentMarksComponent;
  let fixture: ComponentFixture<ImportedStudentMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportedStudentMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedStudentMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
