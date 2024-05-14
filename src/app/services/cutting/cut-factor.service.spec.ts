import { TestBed } from '@angular/core/testing';

import { CutFactorService } from './cut-factor.service';

describe('CutFactorService', () => {
  let service: CutFactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutFactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
