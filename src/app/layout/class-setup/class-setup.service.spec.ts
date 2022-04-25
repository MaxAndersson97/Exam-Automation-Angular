import { TestBed } from '@angular/core/testing';

import { ClassSetupService } from './class-setup.service';

describe('ClassSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassSetupService = TestBed.get(ClassSetupService);
    expect(service).toBeTruthy();
  });
});
