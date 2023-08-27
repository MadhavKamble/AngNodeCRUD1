import { TestBed } from '@angular/core/testing';

import { Item1serviceService } from './item1service.service';

describe('Item1serviceService', () => {
  let service: Item1serviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Item1serviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
