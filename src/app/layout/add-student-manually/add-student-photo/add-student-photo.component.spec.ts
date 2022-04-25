import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentPhotoComponent } from './add-student-photo.component';

describe('PhotoComponent', () => {
  let component: AddStudentPhotoComponent;
  let fixture: ComponentFixture<AddStudentPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
