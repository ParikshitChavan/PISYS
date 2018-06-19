import { TestBed, inject } from '@angular/core/testing';

import { CompanyApiService } from './company-api.service';

describe('CompanyApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyApiService]
    });
  });

  it('should be created', inject([CompanyApiService], (service: CompanyApiService) => {
    expect(service).toBeTruthy();
  }));
});
