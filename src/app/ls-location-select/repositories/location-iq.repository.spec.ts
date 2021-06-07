import { TestBed } from '@angular/core/testing';

import { LocationIqRepository } from './location-iq.repository';

describe('LocationIqRepository', () => {
  let service: LocationIqRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationIqRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
