import { TestBed } from '@angular/core/testing';

import { CustomContentService } from './custom-content.service';

describe('CustomContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomContentService = TestBed.get(CustomContentService);
    expect(service).toBeTruthy();
  });
});
