import { TestBed } from '@angular/core/testing';

import { SanitizedService } from './sanitized.service';

describe('SanitizedService', () => {
  let service: SanitizedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanitizedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
