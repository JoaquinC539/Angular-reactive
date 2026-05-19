import { TestBed } from '@angular/core/testing';

import { Ex } from './ex';

describe('Ex', () => {
  let service: Ex;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
