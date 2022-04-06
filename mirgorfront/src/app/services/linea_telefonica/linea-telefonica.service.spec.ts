import { TestBed } from '@angular/core/testing';

import { LineaTelefonicaService } from './linea-telefonica.service';

describe('LineaTelefonicaService', () => {
  let service: LineaTelefonicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaTelefonicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
