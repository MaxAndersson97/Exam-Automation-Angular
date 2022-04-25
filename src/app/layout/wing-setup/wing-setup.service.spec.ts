import { TestBed } from '@angular/core/testing';

import { WingSetupService } from './wing-setup.service';

describe('WingSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WingSetupService = TestBed.get(WingSetupService);
    expect(service).toBeTruthy();
  });
});
