import { TestBed } from '@angular/core/testing';

import { IssuesResolutionService } from './issues.service';
import { HttpClientModule } from '@angular/common/http';

describe('IssuesResolutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: IssuesResolutionService = TestBed.get(IssuesResolutionService);
    expect(service).toBeTruthy();
  });
});
