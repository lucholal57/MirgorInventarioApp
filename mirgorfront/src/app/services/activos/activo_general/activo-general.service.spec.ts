import { TestBed } from '@angular/core/testing';

import { ActivoGeneralService } from './activo-general.service';

describe('ActivoGeneralService', () => {
  let service: ActivoGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivoGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
