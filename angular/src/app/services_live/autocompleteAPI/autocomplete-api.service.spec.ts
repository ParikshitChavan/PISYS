import { TestBed, inject } from '@angular/core/testing';

import { AutocompleteApiService } from './autocomplete-api.service';

describe('AutocompleteApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteApiService]
    });
  });

  it('should be created', inject([AutocompleteApiService], (service: AutocompleteApiService) => {
    expect(service).toBeTruthy();
  }));
});
