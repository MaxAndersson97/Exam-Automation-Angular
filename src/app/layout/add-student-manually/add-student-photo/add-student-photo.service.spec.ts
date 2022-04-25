import { TestBed } from '@angular/core/testing';

import { AddStudentPhotoService } from './add-student-photo.service';

describe('AddStudentPhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddStudentPhotoService = TestBed.get(AddStudentPhotoService);
    expect(service).toBeTruthy();
  });
});
