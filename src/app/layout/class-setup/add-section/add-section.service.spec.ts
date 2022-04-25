import { TestBed } from '@angular/core/testing';

import { AddSectionService } from './add-section.service';

describe('AddSectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddSectionService = TestBed.get(AddSectionService);
    expect(service).toBeTruthy();
  });
});
