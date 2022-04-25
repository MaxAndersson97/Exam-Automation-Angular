import { TestBed } from '@angular/core/testing';

import { AddStaffManuallyService } from './add-staff-manually.service';

describe('AddStaffManuallyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddStaffManuallyService = TestBed.get(AddStaffManuallyService);
    expect(service).toBeTruthy();
  });
});
