import { TestBed } from '@angular/core/testing';

import { ActivoStandarService } from './activo-standar.service';

describe('ActivoStandarService', () => {
  let service: ActivoStandarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivoStandarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
