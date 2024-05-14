import { TestBed } from '@angular/core/testing';

import { CleaningToolsService } from './cleaning-tools.service';

describe('CleaningToolsService', () => {
  let service: CleaningToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleaningToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
