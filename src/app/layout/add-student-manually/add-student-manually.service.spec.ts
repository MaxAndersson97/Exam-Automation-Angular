import { TestBed } from '@angular/core/testing';

import { AddStudentManuallyService } from './add-student-manually.service';

describe('AddStudentManuallyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddStudentManuallyService = TestBed.get(AddStudentManuallyService);
    expect(service).toBeTruthy();
  });
});
