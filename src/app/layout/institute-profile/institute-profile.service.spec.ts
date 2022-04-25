import { TestBed } from '@angular/core/testing';

import { InstituteProfileService } from './institute-profile.service';

describe('InstituteProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstituteProfileService = TestBed.get(InstituteProfileService);
    expect(service).toBeTruthy();
  });
});
