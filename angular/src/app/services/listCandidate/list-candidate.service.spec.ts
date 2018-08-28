import { TestBed, inject } from '@angular/core/testing';

import { ListCandidateService } from './list-candidate.service';

describe('ListCandidateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListCandidateService]
    });
  });

  it('should be created', inject([ListCandidateService], (service: ListCandidateService) => {
    expect(service).toBeTruthy();
  }));
});
