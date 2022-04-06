import { TestBed } from '@angular/core/testing';

import { ActivoCelularService } from './activo-celular.service';

describe('ActivoCelularService', () => {
  let service: ActivoCelularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivoCelularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
