import { TestBed } from '@angular/core/testing';

import { TrazabilidadService } from './trazabilidad.service';

describe('TrazabilidadService', () => {
  let service: TrazabilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrazabilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
