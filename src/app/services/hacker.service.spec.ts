import { TestBed } from '@angular/core/testing';

import { HackerService } from './hacker.service';

describe('HackerService', () => {
  let service: HackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
