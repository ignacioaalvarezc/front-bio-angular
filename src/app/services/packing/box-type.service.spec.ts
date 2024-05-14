import { TestBed } from '@angular/core/testing';

import { BoxTypeService } from './box-type.service';

describe('BoxTypeService', () => {
  let service: BoxTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
