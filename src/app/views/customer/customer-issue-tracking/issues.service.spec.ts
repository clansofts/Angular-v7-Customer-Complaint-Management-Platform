import { TestBed } from '@angular/core/testing';

import { IssuesService } from './issues.service';
import { HttpClientModule } from '@angular/common/http';

describe('IssuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: IssuesService = TestBed.get(IssuesService);
    expect(service).toBeTruthy();
  });
});
