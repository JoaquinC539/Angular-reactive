import { TestBed } from '@angular/core/testing';

import { Ex4Service } from './ex4-service';

describe('Ex4Service', () => {
  let service: Ex4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
