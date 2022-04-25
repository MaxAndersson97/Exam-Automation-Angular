import { TestBed } from '@angular/core/testing';

import { AddStaffInformationService } from './add-staff-information.service';

describe('AddStaffInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddStaffInformationService = TestBed.get(AddStaffInformationService);
    expect(service).toBeTruthy();
  });
});
