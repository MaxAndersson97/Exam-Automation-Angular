import { TestBed } from '@angular/core/testing';

import { ExamGroupService } from './exam-group.service';

describe('ExamGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamGroupService = TestBed.get(ExamGroupService);
    expect(service).toBeTruthy();
  });
});
