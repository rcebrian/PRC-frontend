import { TestBed } from '@angular/core/testing';

import { AirportDescriptionService } from './airport-description.service';

describe('AirportDescriptionService', () => {
  let service: AirportDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
