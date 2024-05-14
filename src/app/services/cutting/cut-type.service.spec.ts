import { TestBed } from '@angular/core/testing';

import { CutTypeService } from './cut-type.service';

describe('CutTypeService', () => {
  let service: CutTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
