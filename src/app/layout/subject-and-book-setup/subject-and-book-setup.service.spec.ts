import { TestBed } from '@angular/core/testing';

import { SubjectAndBookSetupService } from './subject-and-book-setup.service';

describe('SubjectAndBookSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectAndBookSetupService = TestBed.get(SubjectAndBookSetupService);
    expect(service).toBeTruthy();
  });
});
