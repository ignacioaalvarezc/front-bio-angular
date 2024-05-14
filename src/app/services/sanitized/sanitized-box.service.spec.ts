import { TestBed } from '@angular/core/testing';

import { SanitizedBoxService } from './sanitized-box.service';

describe('SanitizedBoxService', () => {
  let service: SanitizedBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanitizedBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
