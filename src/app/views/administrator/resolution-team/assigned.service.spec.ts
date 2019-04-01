import { TestBed } from '@angular/core/testing';

import { AssignedService } from './assigned.service';
import { HttpClientModule } from '@angular/common/http';

describe('AssignedService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AssignedService = TestBed.get(AssignedService);
    expect(service).toBeTruthy();
  });
});
