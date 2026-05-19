import { TestBed } from '@angular/core/testing';

import { Ex2Service } from './ex2-service';

describe('Ex2Service', () => {
  let service: Ex2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
