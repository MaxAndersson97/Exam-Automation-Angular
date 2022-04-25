import { TestBed } from '@angular/core/testing';

import { InstituteProfilePhotoService } from './institute-profile-photo.service';

describe('InstituteProfilePhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstituteProfilePhotoService = TestBed.get(InstituteProfilePhotoService);
    expect(service).toBeTruthy();
  });
});
