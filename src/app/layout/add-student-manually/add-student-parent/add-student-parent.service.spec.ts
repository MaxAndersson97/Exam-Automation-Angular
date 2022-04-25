import { TestBed } from '@angular/core/testing';

import { AddStudentParentService } from './add-student-parent.service';

describe('AddStudentParentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddStudentParentService = TestBed.get(AddStudentParentService);
    expect(service).toBeTruthy();
  });
});
