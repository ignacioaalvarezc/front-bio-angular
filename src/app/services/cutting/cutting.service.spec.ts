import { TestBed } from '@angular/core/testing';

import { CuttingService } from './cutting.service';

describe('CuttingService', () => {
  let service: CuttingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuttingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
