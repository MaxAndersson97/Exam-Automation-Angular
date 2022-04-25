import { TestBed } from '@angular/core/testing';

import { InstituteProfileSchoolService } from './institute-profile-school.service';

describe('InstituteProfileSchoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstituteProfileSchoolService = TestBed.get(InstituteProfileSchoolService);
    expect(service).toBeTruthy();
  });
});
