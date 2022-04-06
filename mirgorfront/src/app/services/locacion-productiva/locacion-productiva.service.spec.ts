import { TestBed } from '@angular/core/testing';

import { LocacionProductivaService } from './locacion-productiva.service';

describe('LocacionProductivaService', () => {
  let service: LocacionProductivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocacionProductivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
