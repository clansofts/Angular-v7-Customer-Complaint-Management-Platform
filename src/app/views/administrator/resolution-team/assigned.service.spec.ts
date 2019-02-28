import { TestBed } from '@angular/core/testing';

import { AssignedService } from './assigned.service';

describe('AssignedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignedService = TestBed.get(AssignedService);
    expect(service).toBeTruthy();
  });
});
