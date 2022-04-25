import { TestBed } from '@angular/core/testing';

import { InstituteProfileAcademicService } from './institute-profile-academic.service';

describe('InstituteProfileAcademicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstituteProfileAcademicService = TestBed.get(InstituteProfileAcademicService);
    expect(service).toBeTruthy();
  });
});
