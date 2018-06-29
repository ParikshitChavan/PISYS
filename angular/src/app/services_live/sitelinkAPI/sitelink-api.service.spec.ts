import { TestBed, inject } from '@angular/core/testing';

import { SitelinkApiService } from './sitelink-api.service';

describe('SitelinkApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitelinkApiService]
    });
  });

  it('should be created', inject([SitelinkApiService], (service: SitelinkApiService) => {
    expect(service).toBeTruthy();
  }));
});
