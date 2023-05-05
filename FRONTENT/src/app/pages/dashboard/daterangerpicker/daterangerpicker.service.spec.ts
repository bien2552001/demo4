import { TestBed } from '@angular/core/testing';

import { DaterangerpickerService } from './daterangerpicker.service';

describe('DaterangerpickerService', () => {
  let service: DaterangerpickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaterangerpickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
