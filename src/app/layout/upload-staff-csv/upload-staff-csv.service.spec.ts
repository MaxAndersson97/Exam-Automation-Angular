import { TestBed } from '@angular/core/testing';

import { UploadStaffCsvService } from './upload-staff-csv.service';

describe('UploadStaffCsvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadStaffCsvService = TestBed.get(UploadStaffCsvService);
    expect(service).toBeTruthy();
  });
});
