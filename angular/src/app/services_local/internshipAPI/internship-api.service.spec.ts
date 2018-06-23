import { TestBed, inject } from '@angular/core/testing';

import { InternshipApiService } from './internship-api.service';

describe('InternshipApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternshipApiService]
    });
  });

  it('should be created', inject([InternshipApiService], (service: InternshipApiService) => {
    expect(service).toBeTruthy();
  }));
});
