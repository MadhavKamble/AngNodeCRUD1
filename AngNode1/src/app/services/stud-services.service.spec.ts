import { TestBed } from '@angular/core/testing';

import { StudServicesService } from './stud-services.service';

describe('StudServicesService', () => {
  let service: StudServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
