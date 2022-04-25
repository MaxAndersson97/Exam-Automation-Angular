import { TestBed } from '@angular/core/testing';

import { ClassTestExamService } from './class-test-exam.service';

describe('ClassTestExamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassTestExamService = TestBed.get(ClassTestExamService);
    expect(service).toBeTruthy();
  });
});
