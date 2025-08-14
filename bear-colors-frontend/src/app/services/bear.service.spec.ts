import { TestBed } from '@angular/core/testing';

import { BearService } from './bear.service';

describe('BearService', () => {
  let service: BearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
