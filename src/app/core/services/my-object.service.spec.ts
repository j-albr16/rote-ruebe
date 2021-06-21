import { TestBed } from '@angular/core/testing';

import { MyObjectService } from './my-object.service';

describe('MyObjectService', () => {
  let service: MyObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
