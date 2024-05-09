import { TestBed } from '@angular/core/testing';

import { UnrollService } from './unroll.service';

describe('UnrollService', () => {
  let service: UnrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
