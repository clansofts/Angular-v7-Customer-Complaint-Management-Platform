import { TestBed } from '@angular/core/testing';

import { IssuesResolutionService } from './issues.service';

describe('IssuesResolutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssuesResolutionService = TestBed.get(IssuesResolutionService);
    expect(service).toBeTruthy();
  });
});
