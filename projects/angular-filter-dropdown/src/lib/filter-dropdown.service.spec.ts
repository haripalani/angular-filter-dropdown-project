import { TestBed } from '@angular/core/testing';

import { FilterDropdownService } from './filter-dropdown.service';

describe('FilterDropdownService', () => {
  let service: FilterDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
