import { TestBed } from '@angular/core/testing';

import { ImportedStaffDataService } from './imported-staff-data.service';

describe('ImportedStaffDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportedStaffDataService = TestBed.get(ImportedStaffDataService);
    expect(service).toBeTruthy();
  });
});
