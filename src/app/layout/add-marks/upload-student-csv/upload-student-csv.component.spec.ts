import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStudentCsvComponent } from './upload-student-csv.component';

describe('UploadStudentCsvComponent', () => {
  let component: UploadStudentCsvComponent;
  let fixture: ComponentFixture<UploadStudentCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStudentCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStudentCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
