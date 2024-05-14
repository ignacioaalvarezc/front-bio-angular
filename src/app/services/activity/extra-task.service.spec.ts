import { TestBed } from '@angular/core/testing';

import { ExtraTaskService } from './extra-task.service';

describe('ExtraTaskService', () => {
  let service: ExtraTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
