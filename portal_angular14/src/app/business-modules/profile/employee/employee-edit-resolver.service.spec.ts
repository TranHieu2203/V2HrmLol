import { TestBed } from '@angular/core/testing';

import { EmployeeEditResolverService } from './employee-edit-resolver.service';

describe('EmployeeEditResolverService', () => {
  let service: EmployeeEditResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeEditResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
