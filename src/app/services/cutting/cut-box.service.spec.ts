import { TestBed } from '@angular/core/testing';

import { CutBoxService } from './cut-box.service';

describe('CutBoxService', () => {
  let service: CutBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
