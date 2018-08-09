import { TestBed, inject } from '@angular/core/testing';

import { CvBuilderService } from './cvbuilder.service';

describe('CvBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CvBuilderService]
    });
  });

  it('should be created', inject([CvBuilderService], (service: CvBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
