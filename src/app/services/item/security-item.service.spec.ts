import { TestBed } from '@angular/core/testing';

import { SecurityItemService } from './security-item.service';

describe('SecurityItemService', () => {
  let service: SecurityItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
