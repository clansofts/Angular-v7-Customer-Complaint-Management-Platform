import { TestBed } from '@angular/core/testing';

import { ComplaintsService } from './complaints.service';
import { HttpClientModule } from '@angular/common/http';

describe('ComplaintsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ComplaintsService = TestBed.get(ComplaintsService);
    expect(service).toBeTruthy();
  });
});
