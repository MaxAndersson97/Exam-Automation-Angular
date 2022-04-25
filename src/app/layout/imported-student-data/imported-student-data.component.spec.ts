import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedStudentDataComponent } from './imported-student-data.component';

describe('ImportedStudentDataComponent', () => {
  let component: ImportedStudentDataComponent;
  let fixture: ComponentFixture<ImportedStudentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportedStudentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
