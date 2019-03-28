import { TestBed, async } from '@angular/core/testing';

import { UtilitiesService } from './utilities.service';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UtilitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
  }));

  it('should be created', () => {
    const service: UtilitiesService = TestBed.get(UtilitiesService);
    expect(service).toBeTruthy();
  });
});
