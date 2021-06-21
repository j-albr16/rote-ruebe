import { TestBed } from '@angular/core/testing';

import { ExchangeObjectService } from './exchange-object.service';

describe('ExchangeObjectService', () => {
  let service: ExchangeObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
