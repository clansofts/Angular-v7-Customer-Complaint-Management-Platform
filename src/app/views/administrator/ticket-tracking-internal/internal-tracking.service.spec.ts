import { TestBed } from '@angular/core/testing';

import { InternalTrackingService } from './internal-tracking.service';

describe('InternalTrackingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternalTrackingService = TestBed.get(InternalTrackingService);
    expect(service).toBeTruthy();
  });
});
