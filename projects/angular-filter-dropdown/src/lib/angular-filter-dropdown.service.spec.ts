import { TestBed } from '@angular/core/testing';

import { AngularFilterDropdownService } from './angular-filter-dropdown.service';

describe('AngularFilterDropdownService', () => {
  let service: AngularFilterDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularFilterDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
