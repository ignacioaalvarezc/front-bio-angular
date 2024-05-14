import { TestBed } from '@angular/core/testing';

import { StrawService } from './straw.service';

describe('StrawService', () => {
  let service: StrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
