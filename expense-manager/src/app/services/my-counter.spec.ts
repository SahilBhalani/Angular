import { TestBed } from '@angular/core/testing';

import { MyCounter } from './my-counter';

describe('MyCounter', () => {
  let service: MyCounter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCounter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
